import api from "../../utils/api";

export async function fetchNotes() {
  try {
    const response = await api.get("/api/notes/");
    return response.data;
  } catch {
    throw new Error("notes could not be loaded");
  }
}

export async function createNote(newNote) {
  const response = await api.post("api/notes/", newNote);
  return response.data;
}

export const deleteNote = async (Id) => {
  try {
    const response = await api.delete(`api/notes/${Id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to delete note");
  }
};

export const editNote = async ({ id, ...edittedNote }) => {
  const response = await api.put(`api/notes/${id}`, edittedNote);
  return response.data;
};
