const express = require('express');
const Tenant = require('../models/Tenant');
const { auth, requireRole } = require('../middleware/auth');
const router = express.Router();

// Upgrade tenant subscription
router.post('/:slug/upgrade', auth, requireRole('admin'), async (req, res) => {
  try {
    const tenant = await Tenant.findOne({ slug: req.params.slug });
    
    if (!tenant) {
      return res.status(404).json({ error: 'Tenant not found' });
    }

    // Ensure admin can only upgrade their own tenant
    if (tenant._id.toString() !== req.user.tenantId._id.toString()) {
      return res.status(403).json({ error: 'Access denied' });
    }

    tenant.plan = 'pro';
    tenant.noteLimit = -1; // Unlimited
    await tenant.save();

    res.json({ 
      message: 'Successfully upgraded to Pro plan',
      tenant: {
        id: tenant._id,
        name: tenant.name,
        slug: tenant.slug,
        plan: tenant.plan,
        noteLimit: tenant.noteLimit
      }
    });
  } catch (error) {
    console.error('Upgrade error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Cancel tenant subscription
router.post('/:slug/cancel', auth, requireRole('admin'), async (req, res) => {
  try {
    const tenant = await Tenant.findOne({ slug: req.params.slug });
    
    if (!tenant) {
      return res.status(404).json({ error: 'Tenant not found' });
    }

    // Ensure admin can only cancel their own tenant
    if (tenant._id.toString() !== req.user.tenantId._id.toString()) {
      return res.status(403).json({ error: 'Access denied' });
    }

    tenant.plan = 'free';
    tenant.noteLimit = 3;
    await tenant.save();

    res.json({ 
      message: 'Successfully cancelled Pro plan',
      tenant: {
        id: tenant._id,
        name: tenant.name,
        slug: tenant.slug,
        plan: tenant.plan,
        noteLimit: tenant.noteLimit
      }
    });
  } catch (error) {
    console.error('Cancel error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;