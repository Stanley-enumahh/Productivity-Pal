import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createContext, useMemo, useState } from "react";
import { useContext } from "react";
import {
  createNote,
  deleteNote,
  editNote,
  fetchNotes,
} from "../features/Notes/apiNotes";
import toast from "react-hot-toast";

const NotesContext = createContext();

function NoteProvider({ children }) {
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState("creating");
  const [selectedNote, setSelectedNote] = useState(null);

  function handleClose() {
    setSelectedNote(null);
    setIsOpen(false);
    setMode("creating");
  }
  const {
    data: notes,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["notes"],
    queryFn: fetchNotes,
    staleTime: 1000 * 60 * 2,
  });

  const createMutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries(["notes"]);
      toast.success("Note created successfully");
      setIsOpen(false);
    },
    onError: () => {
      toast.error("Error creating note");
    },
  });

  const editMutation = useMutation({
    mutationFn: editNote,
    onSuccess: () => {
      queryClient.invalidateQueries(["notes"]);
      toast.success("Note updated successfully");
      setIsOpen(false);
    },
    onError: () => {
      toast.error("Error updating note");
    },
  });

  const handleCreate = (newNote) => {
    createMutation.mutate(newNote);
    setIsOpen(false);
  };

  const handleEdit = (note) => {
    setMode("editing");
    setSelectedNote(note);
    setIsOpen(true);
  };

  const handleUpdate = (id, edittedNote) => {
    editMutation.mutate({ id, ...edittedNote });
    setIsOpen(false);
  };

  const deleteMutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["notes"],
      });
      toast.success("note deleted sucessfully");
    },
    onError: () => {
      console.error("error deleting note");
      toast.error("error deleting note");
    },
  });

  const handleDeleteNote = (id) => {
    deleteMutation.mutate(id);
  };

  const value = useMemo(
    () => ({
      isOpen,
      setIsOpen,
      handleEdit,
      handleCreate,
      handleUpdate,
      handleDeleteNote,
      mode,
      setMode,
      selectedNote,
      notes,
      isLoading,
      isError,
      handleClose,
    }),
    [isOpen, mode, selectedNote, notes, isLoading, isError]
  );

  return (
    <NotesContext.Provider value={value}>{children}</NotesContext.Provider>
  );
}

function useNotes() {
  const context = useContext(NotesContext);
  if (context === undefined) {
    throw new Error("useNotes must be used within a NotesProvider");
  }
  return context;
}

export { NoteProvider, useNotes };
