import React from "react";
import PropTypes from "prop-types";

// PUBLIC_INTERFACE
export default function Sidebar({
  notes,
  selectedNoteId,
  onNoteSelect,
  onCreateNote,
  onSortChange,
  sortMode,
  searchValue,
  onSearchChange
}) {
  return (
    <aside className="sidebar" data-testid="sidebar">
      <div className="sidebar-header">Notes</div>
      <div className="sidebar-actions">
        <button className="btn" style={{ width: "100%" }} onClick={onCreateNote}>+ New Note</button>
        <input
          type="text"
          className="note-search-bar"
          placeholder="Search notes..."
          value={searchValue}
          onChange={e => onSearchChange(e.target.value)}
          aria-label="Search notes"
        />
        <div style={{ display: "flex", gap: "8px", marginTop: 5 }}>
          <button
            className="sidebar-filter-btn"
            onClick={() => onSortChange("title")}
            aria-pressed={sortMode === "title"}
            title="Sort by title"
          >
            {sortMode === "title" ? <b>Title</b> : "Title"}
          </button>
          <button
            className="sidebar-filter-btn"
            onClick={() => onSortChange("date")}
            aria-pressed={sortMode === "date"}
            title="Sort by date"
          >
            {sortMode === "date" ? <b>Date</b> : "Date"}
          </button>
        </div>
      </div>
      <div className="sidebar-list" style={{ flex: 1 }}>
        {notes.length === 0 && (
          <div style={{ color: "rgba(255,255,255,0.65)", padding: "0.7rem 1.5rem" }}>
            No notes found.
          </div>
        )}
        {notes.map((note) => (
          <button
            className={note.id === selectedNoteId ? "active" : ""}
            key={note.id}
            onClick={() => onNoteSelect(note.id)}
            aria-current={note.id === selectedNoteId}
          >
            {note.title || <em>(Untitled)</em>}
          </button>
        ))}
      </div>
      <div className="sidebar-footer">Note Organizer</div>
    </aside>
  );
}

Sidebar.propTypes = {
  notes: PropTypes.array.isRequired,
  selectedNoteId: PropTypes.string,
  onNoteSelect: PropTypes.func.isRequired,
  onCreateNote: PropTypes.func.isRequired,
  onSortChange: PropTypes.func.isRequired,
  sortMode: PropTypes.string.isRequired,
  searchValue: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func.isRequired
};
