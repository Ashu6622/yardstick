import React from 'react';

function NoteCard({ note, onEdit, onDelete }) {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="note-card">
      <h3 className="note-title">{note.title}</h3>
      <p className="note-content">{note.content}</p>
      <div style={{ 
        fontSize: '0.875rem', 
        color: '#666', 
        marginBottom: '1rem',
        borderTop: '1px solid #eee',
        paddingTop: '0.5rem'
      }}>
        Created: {formatDate(note.createdAt)}
        {note.updatedAt !== note.createdAt && (
          <br />
        )}
        {note.updatedAt !== note.createdAt && (
          <>Updated: {formatDate(note.updatedAt)}</>
        )}
      </div>
      <div className="note-actions">
        <button 
          onClick={() => onEdit(note)}
          className="btn btn-primary btn-sm"
        >
          Edit
        </button>
        <button 
          onClick={() => onDelete(note._id)}
          className="btn btn-danger btn-sm"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default NoteCard;