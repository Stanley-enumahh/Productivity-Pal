import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createContext, useContext, useMemo, useState } from "react";
import {
  createTodo,
  deleteTodo,
  editTodo,
  fetchTodos,
} from "../Services/Todos";
import toast from "react-hot-toast";

const TodoContext = createContext();

function TodoProvider({ children }) {
  const queryClient = useQueryClient();
  const [mode, setMode] = useState("creating");
  const [isOpen, setIsOpen] = useState(false);
  const [dueDate, setDueDate] = useState("");
  const [selectedTodo, setSelectedTodo] = useState(null);

  const {
    data: todos,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodos,
    staleTime: 1000 * 60 * 2,
  });

  function handleClose() {
    setSelectedTodo(null);
    setIsOpen(false);
    setMode("creating");
  }

  const createMutation = useMutation({
    mutationFn: createTodo,
    onSuccess: () => {
      queryClient.invalidateQueries(["todos"]);
      toast.success("Todolist created successfully");
      setIsOpen(false);
    },
    onError: () => {
      toast.error("Error creating todolist");
    },
  });

  const editMutation = useMutation({
    mutationFn: editTodo,
    onSuccess: () => {
      queryClient.invalidateQueries(["todos"]);
      toast.success("Todo updated successfully");
      setIsOpen(false);
    },
    onError: () => {
      toast.error("Error updating todo");
    },
  });

  const handleCreate = (newTodo) => {
    setMode("creating");
    createMutation.mutate(newTodo);
  };

  const handleEdit = (todo) => {
    setMode("editing");
    setSelectedTodo(todo);
    setIsOpen(true);
  };

  const handleUpdate = (id, edittedTodo) => {
    editMutation.mutate({ id, ...edittedTodo });
    setIsOpen(false);
  };

  const deleteMutation = useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["todos"],
      });
      toast.success("todo deleted sucessfully");
    },
    onError: () => {
      console.error("error deleting todo");
      toast.error("error deleting todo");
    },
  });

  const handleDeleteTodo = (id) => {
    deleteMutation.mutate(id);
  };

  const value = useMemo(
    () => ({
      todos,
      isLoading,
      isError,
      isOpen,
      setIsOpen,
      handleClose,
      setDueDate,
      handleCreate,
      selectedTodo,
      handleEdit,
      handleUpdate,
      dueDate,
      mode,
      handleDeleteTodo,
    }),
    [todos, isLoading, isError, isOpen, dueDate, mode, selectedTodo]
  );

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
}

function useTodos() {
  const context = useContext(TodoContext);
  if (context === undefined) {
    throw new Error("useTodos must be used within a TodosProvider");
  }
  return context;
}

export { TodoProvider, useTodos };

//  if (mode === "creating") {
//    handleCreate({
//      title: data.title,
//      due_date: formatDate(dueDate),
//      todoitems: tempTodos.map((todo) => ({
//        title: todo.title, // match what backend expects
//      })),
//    });
//  }
