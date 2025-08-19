import React from "react";
import { formatDate } from "../utils/date";
import PropTypes from "prop-types";

// PUBLIC_INTERFACE
export default function NoteList({ notes, onSelect, onDelete, selectedNoteId }) {
  if (notes.length === 0) {
    return (
      <div className="note-list-empty">
        No notes found.
      </div>
    );
  }
  return (
    <div className="note-list">
      {notes.map(note => (
        <div
          className="note-item"
          key={note.id}
          style={{
            border: note.id === selectedNoteId ? "2px solid var(--color-accent)" : undefined,
            opacity: note.archived ? 0.6 : 1
          }}
          tabIndex={0}
          aria-current={note.id === selectedNoteId}
          onClick={() => onSelect(note.id)}
        >
          <div className="note-header">
            <span className="note-title">{note.title || <em>(Untitled)</em>}</span>
            <span className="note-date">{formatDate(note.updatedAt || note.createdAt)}</span>
          </div>
          <div className="note-content-preview">
            {note.content?.slice(0, 120) || <span style={{ opacity: 0.6 }}>(No content)</span>}
          </div>
          <div className="note-item-actions">
            <button
              onClick={e => { e.stopPropagation(); onDelete(note.id); }}
              title="Delete note"
              aria-label="Delete note"
            >🗑</button>
          </div>
        </div>
      ))}
    </div>
  );
}

NoteList.propTypes = {
  notes: PropTypes.array.isRequired,
  onSelect: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  selectedNoteId: PropTypes.string
};
