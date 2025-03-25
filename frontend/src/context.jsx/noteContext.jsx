// import { useEffect, useReducer, useState } from "react";
// import api from "../utils/api";
// import { useContext } from "react";
// import { useAuth } from "./AuthContext";

// const bgColors = [
//   "bg-blue-200",
//   "bg-red-300",
//   "bg-amber-200",
//   "bg-pink-200",
//   "bg-green-200",
//   "bg-purple-200",
// ];

// function getRandomColor() {
//   return bgColors[Math.floor(Math.random() * bgColors.length)];
// }

// function getDate() {
//   const today = new Date();
//   return today.toLocaleDateString("en-US", {
//     month: "short",
//     day: "numeric",
//     year: "numeric",
//   });
// }

// const NotesContext = createContext();

// function NoteProvider({ children }) {
//   const [isOpen, setIsOpen] = useState(false);
//   // const { user } = useAuth();

//   // fetch notes

//   export async function fetchNotes() {
//     useEffect(function () {
//       async function fetchNotes() {
//         try {
//           const response = await api.get("/api/notes/");
//           return response.data;
//         } catch {
//           throw new Error("notes could not be loaded");
//         }
//       }

//       fetchNotes();
//     }, []);
//   }

//   // add notes
//   // async function AddNote(newNote) {
//   //   dispatch({ type: "loading" });
//   //   try {
//   //     const response = await api.post("/api/notes", newNote);
//   //     console.log(response);
//   //     dispatch({ type: "note/added", payload: response.data });
//   //   } catch {
//   //     dispatch({ type: "rejected", payload: "error adding notes..." });
//   //   }
//   // }

//   return (
//     <NotesContext.Provider value={{ isOpen, setIsOpen }}>
//       {children}
//     </NotesContext.Provider>
//   );
// }

// // function handleSubmit(e) {
// //   e.preventDefault();
// //   if (note.id) {
// //     dispatch({
// //       type: "note/editted",
// //       payload: {
// //         id: note.id,
// //         title: note.noteTitle,
// //         info: note.noteInfo,
// //         bgColor: note.bgColor,
// //         date: note.date,
// //       },
// //     });
// //   } else {
// //     dispatch({
// //       type: "note/added",
// //       payload: {
// //         id: crypto.randomUUID(),
// //         title: note.noteTitle,
// //         info: note.noteInfo,
// //         bgColor: getRandomColor(),
// //         date: getDate(),
// //       },
// //     });
// //   }

// //   setIsOpen(false);
// //   setNote({ noteTitle: "", noteInfo: "", id: null });
// // }

// // function handleEdit(selectedNote) {
// //   setIsOpen(true);
// //   setNote({
// //     id: selectedNote.id,
// //     noteTitle: selectedNote.title,
// //     noteInfo: selectedNote.info,
// //     bgColor: selectedNote.bgColor,
// //     date: selectedNote.date,
// //   });
// // }

// // useEffect(
// //   function () {
// //     localStorage.setItem("notes", JSON.stringify(notes));
// //   },
// //   [notes]
// // );

// function useNotes() {
//   const context = useContext(NotesContext);
//   if (context === undefined) {
//     throw new Error("useNotes must be used within a NotesProvider");
//   }
//   return context;
// }

// export { NoteProvider, useNotes };
