import React, { useState, useEffect } from "react";
import "./App.css";
import Sidebar from "./components/Sidebar";
import NoteList from "./components/NoteList";
import NoteEditor from "./components/NoteEditor";

// A stub for a future backend call
function generateId() {
  return Math.random().toString(36).substr(2, 10);
}

// PUBLIC_INTERFACE
function App() {
  // Sidebar state and theme
  const [theme, setTheme] = useState("light");

  // Notes state: each note {id, title, content, createdAt, updatedAt}
  const [notes, setNotes] = useState([]);
  const [selectedNoteId, setSelectedNoteId] = useState(null);
  const [editing, setEditing] = useState(false); // true if editing/creating a note
  const [search, setSearch] = useState("");
  const [sortMode, setSortMode] = useState("date"); // or "title"

  // Effect to apply theme to document element
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // Simulate fetch from backend on initial mount
  useEffect(() => {
    // This is just a placeholder, would be replaced by actual API call.
    setTimeout(() => {
      setNotes([
        {
          id: generateId(),
          title: "Welcome to Note Organizer!",
          content: "Start by creating, editing, or searching your notes.",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
      ]);
    }, 180);
  }, []);

  // Filter and sort notes
  const filteredNotes = notes
    .filter(
      n =>
        n.title?.toLowerCase().includes(search.toLowerCase()) ||
        n.content?.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sortMode === "title") {
        return (a.title || "").localeCompare(b.title || "");
      } else {
        return new Date(b.updatedAt || b.createdAt) - new Date(a.updatedAt || a.createdAt);
      }
    });

  // PUBLIC_INTERFACE
  const handleNoteSelect = (id) => {
    setSelectedNoteId(id);
    setEditing(false);
  };

  // PUBLIC_INTERFACE
  const handleCreateNote = () => {
    setEditing(true);
    setSelectedNoteId(null);
  };

  // PUBLIC_INTERFACE
  const handleDeleteNote = (id) => {
    const afterDelete = notes.filter(n => n.id !== id);
    setNotes(afterDelete);
    if (selectedNoteId === id) {
      setSelectedNoteId(afterDelete.length > 0 ? afterDelete[0].id : null);
      setEditing(false);
    }
  };

  // PUBLIC_INTERFACE
  const handleSaveNote = (note) => {
    if (note.id) {
      setNotes(prev =>
        prev.map(n =>
          n.id === note.id
            ? { ...n, title: note.title, content: note.content, updatedAt: new Date().toISOString() }
            : n
        )
      );
    } else {
      // Create new note
      const id = generateId();
      setNotes(prev => [
        {
          id,
          title: note.title,
          content: note.content,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        ...prev
      ]);
      setSelectedNoteId(id);
    }
    setEditing(false);
  };

  // PUBLIC_INTERFACE
  const handleEditNote = () => {
    setEditing(true);
  };

  // PUBLIC_INTERFACE
  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  // Find current note (for edit/view):
  const selectedNote = notes.find((n) => n.id === selectedNoteId) || null;

  return (
    <div className="App" style={{ minHeight: "100vh", display: "flex" }}>
      <button
        className="theme-toggle"
        onClick={toggleTheme}
        aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      >
        {theme === "light" ? "🌙 Dark" : "☀️ Light"}
      </button>
      <div className="App-layout" style={{ display: "flex", width: "100%" }}>
        <Sidebar
          notes={filteredNotes}
          selectedNoteId={selectedNoteId}
          onNoteSelect={handleNoteSelect}
          onCreateNote={handleCreateNote}
          onSortChange={setSortMode}
          sortMode={sortMode}
          searchValue={search}
          onSearchChange={setSearch}
        />
        <main className="main-panel">
          <div className="main-header">
            <span className="notes-title">
              {editing ? (selectedNote ? "Edit Note" : "New Note") : "Your Notes"}
            </span>
            <div className="note-actions">
              {!editing && (
                <>
                  <button
                    className="btn"
                    style={{ background: "var(--color-primary)" }}
                    onClick={handleCreateNote}
                  >
                    + New Note
                  </button>
                  {selectedNote && (
                    <button
                      className="btn"
                      style={{ background: "var(--color-accent)", color: "#222" }}
                      onClick={handleEditNote}
                    >
                      Edit
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
          <section style={{ flex: 1, display: "flex", flexDirection: "column" }}>
            {editing ? (
              <NoteEditor
                note={selectedNote}
                onSave={handleSaveNote}
                onCancel={() => setEditing(false)}
              />
            ) : (
              <NoteList
                notes={filteredNotes}
                onSelect={handleNoteSelect}
                onDelete={handleDeleteNote}
                selectedNoteId={selectedNoteId}
              />
            )}
          </section>
        </main>
      </div>
    </div>
  );
}

export default App;
