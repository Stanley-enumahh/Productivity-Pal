import { useNotes } from "../../context.jsx/noteContext";
import { AddNoteForm } from "./NoteForm";
import { NoteList } from "./NotesList";

export default function NoteUi() {
  const { isOpen } = useNotes();

  return (
    <div className="relative w-full h-screen overflow-auto">
      <NoteList />
      {isOpen && <AddNoteForm />}
    </div>
  );
}
