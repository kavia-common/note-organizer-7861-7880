import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

// PUBLIC_INTERFACE
export default function NoteEditor({ note, onSave, onCancel }) {
  const [title, setTitle] = useState(note?.title || "");
  const [content, setContent] = useState(note?.content || "");
  useEffect(() => {
    setTitle(note?.title || "");
    setContent(note?.content || "");
  }, [note]);

  // PUBLIC_INTERFACE
  function handleFormSubmit(e) {
    e.preventDefault();
    onSave({ ...note, title, content });
  }
  return (
    <form className="note-editor" onSubmit={handleFormSubmit}>
      <div className="note-editor-title">
        {note && note.id ? "Edit Note" : "New Note"}
      </div>
      <input
        className="note-editor-input"
        placeholder="Title"
        maxLength={100}
        autoFocus={true}
        value={title}
        onChange={e => setTitle(e.target.value)}
        aria-label="Note title"
      />
      <textarea
        className="note-editor-textarea"
        placeholder="Note content..."
        value={content}
        onChange={e => setContent(e.target.value)}
        rows={7}
        aria-label="Note content"
        spellCheck={true}
      />
      <div className="note-editor-actions">
        <button className="btn" type="submit" aria-label="Save note">Save</button>
        <button className="btn" style={{ background: "var(--color-primary)", color: "var(--color-white)" }} type="button" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
}

NoteEditor.propTypes = {
  note: PropTypes.object,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired
};
