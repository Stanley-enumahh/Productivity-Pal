import { useQuery } from "@tanstack/react-query";
// import { useNotes } from "../../context.jsx/noteContext";
import { fetchNotes } from "./apiNotes";
import { NoteItem } from "./NoteItem";

export function NoteList({ setShowForm, showForm }) {
  const {
    data: notes,
    isLoading,
    Error,
  } = useQuery({
    queryKey: ["notes"],
    queryFn: fetchNotes,
  });

  if (isLoading) return <p>Loading...</p>;
  return (
    <div className="flex flex-col w-full gap-5">
      <h1 className="text-black dark:text-white text-xl font-semibold mt-4">
        My Notes
      </h1>
      <div className="flex flex-row w-full h-full relative justify-center">
        {!showForm ? (
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-800 cursor-pointer rounded-lg shadow-lg hover:opacity-80 duration-200 transition-all text-white text-xs px-3 py-2 absolute left-0"
          >
            + Add note
          </button>
        ) : (
          ""
        )}

        <ul className="flex flex-row flex-wrap gap-4">
          {notes?.map((note) => (
            <NoteItem key={note.id} note={note} setShowForm={setShowForm} />
          ))}
        </ul>
      </div>
    </div>
  );
}
