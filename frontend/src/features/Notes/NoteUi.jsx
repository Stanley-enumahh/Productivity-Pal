// import { useNotes } from "../../context.jsx/noteContext";
import { AddNoteForm } from "./NoteForm";
import { NoteList } from "./NotesList";
import { useState } from "react";

export default function NoteUi() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="relative w-full">
      <NoteList setShowForm={setShowForm} showForm={showForm} />
      {showForm && <AddNoteForm setShowForm={setShowForm} />}
    </div>
  );
}
