import { data } from "react-router";
import api from "../utils/api";

export async function fetchTodos() {
  try {
    const response = await api.get("/api/todos/");
    return response.data;
  } catch {
    throw new Error("notes could not be loaded");
  }
}

export async function createTodo(newTodo) {
  const response = await api.post("api/todos/", newTodo);
  console.log(response.data);
  // console.log(newTodo);
  return response.data;
}

export const deleteTodo = async (Id) => {
  try {
    const response = await api.delete(`api/todos/${Id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to delete todo");
  }
};
