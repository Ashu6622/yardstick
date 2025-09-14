const express = require('express');
const Note = require('../models/Note');
const { auth } = require('../middleware/auth');
const router = express.Router();

// Get all notes for current tenant
router.get('/', auth, async (req, res) => {
  try {
    const notes = await Note.find({ tenantId: req.user.tenantId._id })
      .populate('userId', 'email')
      .sort({ createdAt: -1 });
    
    res.json(notes);
  } catch (error) {
    console.error('Get notes error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get specific note
router.get('/:id', auth, async (req, res) => {
  try {
    const note = await Note.findOne({
      _id: req.params.id,
      tenantId: req.user.tenantId._id
    }).populate('userId', 'email');

    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }

    res.json(note);
  } catch (error) {
    console.error('Get note error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Create note
router.post('/', auth, async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ error: 'Title and content are required' });
    }

    // Check subscription limits
    if (req.user.tenantId.plan === 'free') {
      const noteCount = await Note.countDocuments({ tenantId: req.user.tenantId._id });
      if (noteCount >= req.user.tenantId.noteLimit) {
        return res.status(403).json({ 
          error: 'Note limit reached. Upgrade to Pro for unlimited notes.',
          limitReached: true 
        });
      }
    }

    const note = new Note({
      title,
      content,
      userId: req.user._id,
      tenantId: req.user.tenantId._id
    });

    await note.save();
    await note.populate('userId', 'email');

    res.status(201).json(note);
  } catch (error) {
    console.error('Create note error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update note
router.put('/:id', auth, async (req, res) => {
  try {
    const { title, content } = req.body;

    const note = await Note.findOneAndUpdate(
      { 
        _id: req.params.id, 
        tenantId: req.user.tenantId._id 
      },
      { title, content },
      { new: true, runValidators: true }
    ).populate('userId', 'email');

    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }

    res.json(note);
  } catch (error) {
    console.error('Update note error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete note
router.delete('/:id', auth, async (req, res) => {
  try {
    const note = await Note.findOneAndDelete({
      _id: req.params.id,
      tenantId: req.user.tenantId._id
    });

    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }

    res.json({ message: 'Note deleted successfully' });
  } catch (error) {
    console.error('Delete note error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;