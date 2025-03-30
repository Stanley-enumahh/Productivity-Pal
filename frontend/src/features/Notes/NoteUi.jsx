// import { useNotes } from "../../context.jsx/noteContext";
import { AddNoteForm } from "./NoteForm";
import { NoteList } from "./NotesList";
import { useState } from "react";

export default function NoteUi() {
  const [showForm, setShowForm] = useState(false);
  const [mode, setMode] = useState("creating");
  const [selectedNote, setSelectedNote] = useState(null);

  const handleCreate = () => {
    setMode("creating");
    setSelectedNote(null);
    setShowForm(true);
  };

  const handleEdit = (note) => {
    setMode("editing");
    setSelectedNote(note);
    setShowForm(true);
  };

  return (
    <div className="relative w-full h-screen overflow-auto">
      <NoteList
        setShowForm={setShowForm}
        showForm={showForm}
        onEdit={handleEdit}
        handleCreate={handleCreate}
      />
      {showForm && (
        <AddNoteForm
          setShowForm={setShowForm}
          mode={mode}
          note={selectedNote}
        />
      )}
    </div>
  );
}
