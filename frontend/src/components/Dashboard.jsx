import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import Header from './Header';
import NoteCard from './NoteCard';
import NoteModal from './NoteModal';
import ConfirmModal from './ConfirmModal';

// const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
const API_URL = 'http://localhost:5001/api';

function Dashboard({ user, onLogout }) {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const [upgrading, setUpgrading] = useState(false);
  const [cancelling, setCancelling] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteNoteId, setDeleteNoteId] = useState(null);

  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const response = await fetch(`${API_URL}/notes`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setNotes(data);
      } else {
        toast.error('Failed to fetch notes');
      }
    } catch (err) {
      toast.error('Network error');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateNote = () => {
    setEditingNote(null);
    setShowModal(true);
  };

  const handleEditNote = (note) => {
    setEditingNote(note);
    setShowModal(true);
  };

  const handleDeleteNote = (noteId) => {
    setDeleteNoteId(noteId);
    setShowConfirm(true);
  };

  const confirmDeleteNote = async () => {
    setShowConfirm(false);
    const noteId = deleteNoteId;
    setDeleteNoteId(null);

    try {
      const response = await fetch(`${API_URL}/notes/${noteId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        setNotes(notes.filter(note => note._id !== noteId));
        toast.success('Note deleted successfully!');
      } else {
        toast.error('Failed to delete note');
      }
    } catch (err) {
      toast.error('Network error');
    }
  };

  const handleSaveNote = async (noteData) => {
    try {
      const url = editingNote 
        ? `${API_URL}/notes/${editingNote._id}`
        : `${API_URL}/notes`;
      
      const method = editingNote ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(noteData)
      });

      if (response.ok) {
        const savedNote = await response.json();
        
        if (editingNote) {
          setNotes(notes.map(note => 
            note._id === editingNote._id ? savedNote : note
          ));
          toast.success('Note updated successfully!');
        } else {
          setNotes([...notes, savedNote]);
          toast.success('Note created successfully!');
        }
        
        setShowModal(false);
        setEditingNote(null);
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || 'Failed to save note');
      }
    } catch (err) {
      toast.error('Network error');
    }
  };

  const handleUpgrade = async () => {
    setUpgrading(true);
    try {
      const response = await fetch(`${API_URL}/tenants/${user.tenant.slug}/upgrade`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        // Update user data in localStorage
        const updatedUser = {
          ...user,
          tenant: {
            ...user.tenant,
            plan: 'pro'
          }
        };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        
        // Refresh the page to update the UI
        window.location.reload();
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || 'Failed to upgrade');
      }
    } catch (err) {
      toast.error('Network error');
    } finally {
      setUpgrading(false);
    }
  };

  const handleCancel = () => {
    setShowConfirm(true);
  };

  const confirmCancel = async () => {
    setShowConfirm(false);
    setCancelling(true);
    try {
      const response = await fetch(`${API_URL}/tenants/${user.tenant.slug}/cancel`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        // Update user data in localStorage
        const updatedUser = {
          ...user,
          tenant: {
            ...user.tenant,
            plan: 'free'
          }
        };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        
        // Refresh the page to update the UI
        window.location.reload();
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || 'Failed to cancel subscription');
      }
    } catch (err) {
      toast.error('Network error');
    } finally {
      setCancelling(false);
    }
  };

  const canCreateNote = user.tenant?.plan === 'pro' || notes.length < 3;
  const isAtLimit = user.tenant?.plan === 'free' && notes.length >= 3;

  if (loading) {
    return (
      <div>
        <Header user={user} onLogout={onLogout} />
        <div className="container">
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            Loading notes...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <Header user={user} onLogout={onLogout} />
      
      <div className="container">
        <div className="dashboard-header">
          <h2 className="dashboard-title">My Notes</h2>
          <div className="dashboard-actions">
            <span className="notes-count">
              {notes.length} {user.tenant.plan === 'free' ? '/ 3' : ''} notes
            </span>
            {canCreateNote && (
              <button 
                onClick={handleCreateNote}
                className="btn btn-primary"
              >
                Create Note
              </button>
            )}
            {user.role === 'admin' && user.tenant.plan === 'free' && (
              <button 
                onClick={handleUpgrade}
                className="btn btn-warning"
                disabled={upgrading}
              >
                {upgrading ? 'Upgrading...' : 'Upgrade to Pro'}
              </button>
            )}
            {user.role === 'admin' && user.tenant.plan === 'pro' && (
              <button 
                onClick={handleCancel}
                className="btn btn-danger"
                disabled={cancelling}
              >
                {cancelling ? 'Cancelling...' : 'Cancel Pro'}
              </button>
            )}
          </div>
        </div>

        {isAtLimit && (
          <div className="limit-warning">
            <strong>Note limit reached!</strong> You've reached the maximum of 3 notes for the free plan.
            {user.role === 'admin' ? (
              <span> Click "Upgrade to Pro" to create unlimited notes.</span>
            ) : (
              <span> Ask your admin to upgrade to Pro for unlimited notes.</span>
            )}
          </div>
        )}

        {notes.length === 0 ? (
          <div className="empty-state">
            <h3>No notes yet</h3>
            <p>Create your first note to get started!</p>
            {canCreateNote && (
              <button 
                onClick={handleCreateNote}
                className="btn btn-primary"
              >
                Create Your First Note
              </button>
            )}
          </div>
        ) : (
          <div className="notes-grid">
            {notes.map(note => (
              <NoteCard
                key={note._id}
                note={note}
                onEdit={handleEditNote}
                onDelete={handleDeleteNote}
              />
            ))}
          </div>
        )}

        {showModal && (
          <NoteModal
            note={editingNote}
            onSave={handleSaveNote}
            onClose={() => {
              setShowModal(false);
              setEditingNote(null);
            }}
          />
        )}

        <ConfirmModal
          isOpen={showConfirm && !deleteNoteId}
          title="Cancel Pro Subscription"
          message="Are you sure you want to cancel your Pro subscription? You will be limited to 3 notes and lose access to unlimited notes."
          onConfirm={confirmCancel}
          onCancel={() => setShowConfirm(false)}
        />

        <ConfirmModal
          isOpen={showConfirm && deleteNoteId}
          title="Delete Note"
          message="Are you sure you want to delete this note? This action cannot be undone."
          onConfirm={confirmDeleteNote}
          onCancel={() => {
            setShowConfirm(false);
            setDeleteNoteId(null);
          }}
        />
      </div>
    </div>
  );
}

export default Dashboard;