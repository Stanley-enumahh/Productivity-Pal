import { useEffect, useReducer, useState } from "react";
import { Notes } from "../components/notesDesign";

function noteReducer(state, action) {
  switch (action.type) {
    case "ADD_NOTE": {
      const newNotes = [...state, action.payLoad];
      localStorage.setItem("notes", JSON.stringify(newNotes));
      return newNotes;
    }
    case "EDIT_NOTE": {
      const updatedNotes = state.map((note) =>
        note.id === action.payLoad.id ? { ...note, ...action.payLoad } : note
      );
      localStorage.setItem("notes", JSON.stringify(updatedNotes));
      return updatedNotes;
    }
    case "DELETE_NOTE": {
      const filteredNotes = state.filter((note) => note.id !== action.payLoad);
      localStorage.setItem("notes", JSON.stringify(filteredNotes));
      return filteredNotes;
    }
    case "LOAD_NOTE":
      return action.payLoad;
  }
}

export function NoteUI() {
  const [isOpen, setIsOpen] = useState(false);
  const storedNotes = JSON.parse(localStorage.getItem("notes")) || [];
  const [notes, disPatch] = useReducer(noteReducer, storedNotes);
  const [note, setNote] = useState({
    noteTitle: "",
    noteInfo: "",
  });

  useEffect(function () {
    const savedNotes = JSON.parse(localStorage.getItem("notes"));
    if (savedNotes) {
      disPatch({ type: "LOAD_NOTE", payLoad: savedNotes });
    }
  }, []);

  const bgColors = [
    "bg-blue-200",
    "bg-red-300",
    "bg-amber-200",
    "bg-pink-200",
    "bg-green-200",
    "bg-purple-200",
  ];

  function getRandomColor() {
    return bgColors[Math.floor(Math.random() * bgColors.length)];
  }

  function getDate() {
    const today = new Date();
    return today.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (note.id) {
      disPatch({
        type: "EDIT_NOTE",
        payLoad: {
          id: note.id,
          title: note.noteTitle,
          info: note.noteInfo,
          bgColor: note.bgColor,
          date: note.date,
        },
      });
    } else {
      disPatch({
        type: "ADD_NOTE",
        payLoad: {
          id: crypto.randomUUID(),
          title: note.noteTitle,
          info: note.noteInfo,
          bgColor: getRandomColor(),
          date: getDate(),
        },
      });
    }

    setIsOpen(false);
    setNote({ noteTitle: "", noteInfo: "", id: null });
  }

  function handleEdit(selectedNote) {
    setIsOpen(true);
    setNote({
      id: selectedNote.id,
      noteTitle: selectedNote.title,
      noteInfo: selectedNote.info,
      bgColor: selectedNote.bgColor,
      date: selectedNote.date,
    });
  }

  useEffect(
    function () {
      localStorage.setItem("notes", JSON.stringify(notes));
    },
    [notes]
  );

  return (
    <div className="flex flex-col w-full gap-5">
      <h1 className="text-black dark:text-white text-xl font-semibold mt-4">
        My Notes
      </h1>
      <div className="flex flex-row w-full h-full relative justify-center">
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="bg-blue-800 cursor-pointer rounded-lg shadow-lg hover:opacity-80 duration-200 transition-all text-white text-xs px-3 py-2 absolute left-0"
          >
            + Add note
          </button>
        )}
        {isOpen && (
          <NoteForm
            addNote={handleSubmit}
            setIsOpen={setIsOpen}
            note={note}
            setNote={setNote}
          />
        )}
        <Notes
          notes={notes}
          disPatch={disPatch}
          setIsOpen={setIsOpen}
          handleEdit={handleEdit}
        />
      </div>
    </div>
  );
}

function NoteForm({ addNote, setIsOpen, note, setNote }) {
  return (
    <form className=" w-[250px] absolute mt-[60px] gap-4 h-fit p-5 rounded-lg flex shadow-xl flex-col bg-white dark:bg-[#0b3954] transition-all duration-200">
      <span className="w-full flex justify-end">
        <button
          onClick={() => {
            setIsOpen(false);
            setNote({ noteTitle: "", noteInfo: "" });
          }}
          className="text-sm cursor-pointer hover:bg-gray-300 transition-all duration-200 text-red-500 px-2 rounded"
        >
          x
        </button>
      </span>
      <input
        value={note.noteTitle}
        onChange={(e) => setNote({ ...note, noteTitle: e.target.value })}
        type="text"
        placeholder="title"
        className="border px-3 placeholder:dark:text-neutral-300 dark:text-neutral-200 text-black text-xs py-2 outline-none border-gray-400 rounded-lg"
      />
      <textarea
        value={note.noteInfo}
        onChange={(e) => setNote({ ...note, noteInfo: e.target.value })}
        placeholder="note"
        id=""
        className="h-[70px] border placeholder:dark:text-neutral-300 px-3 dark:text-neutral-200 text-black text-xs py-2 outline-none border-gray-400 rounded-lg"
      ></textarea>
      <button
        onClick={addNote}
        className="bg-blue-800 cursor-pointer rounded-lg shadow-lg hover:opacity-80 duration-200 transition-all text-white text-xs px-3 py-2 "
      >
        Save note
      </button>
    </form>
  );
}
