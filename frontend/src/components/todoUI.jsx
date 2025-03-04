import { useEffect, useReducer, useState } from "react";
import { Todos } from "./todoDesign";
import { LuDot } from "react-icons/lu";

function todoReducer(state, action) {
  switch (action.type) {
    case "ADD_TODO_LIST":
      if (!action.payload || !action.payload.title || !action.payload.todos) {
        return state;
      }
      return [
        ...state,
        {
          id: crypto.randomUUID(),
          title: action.payload.title,
          todos: action.payload.todos,
        },
      ];
    case "DELETE_TODO": {
      const filteredTodos = state.filter((todo) => todo.id !== action.payload);
      localStorage.setItem("todos", JSON.stringify(filteredTodos));
      return filteredTodos;
    }

    case "TOGGLE_COMPLETED": {
      return state.map((list) =>
        list.id === action.listId
          ? {
              ...list,
              todos: list.todos.map((todo) =>
                todo.id === action.todoId
                  ? { ...todo, isCompleted: !todo.isCompleted }
                  : todo
              ),
            }
          : list
      );
    }
    case "LOAD_TODO":
      return action.payload;

    default:
      return state;
  }
}

export function TodoUI() {
  const [isOpen, setIsOpen] = useState(false);
  const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
  const [todoArray, disPatch] = useReducer(todoReducer, savedTodos);
  const [tempTodos, setTempTodos] = useState([]);
  const [todoText, setTodoText] = useState("");
  const [title, setTitle] = useState("");

  useEffect(function () {
    const savedTodos = JSON.parse(localStorage.getItem("todos"));
    if (savedTodos) {
      disPatch({ type: "LOAD_TODO", payload: savedTodos });
    }
  }, []);

  function handleToggletodo(listId, todoId) {
    disPatch({ type: "TOGGLE_COMPLETED", listId, todoId });
  }

  function AddTemptTodo(e) {
    e.preventDefault();
    if (!todoText.trim()) return;
    setTempTodos([
      ...tempTodos,
      { id: crypto.randomUUID(), text: todoText, isCompleted: false },
    ]);
    setTodoText("");
  }

  const submitTodoList = () => {
    if (title.trim() && tempTodos.length > 0) {
      disPatch({
        type: "ADD_TODO_LIST",
        payload: { title, todos: tempTodos },
      });
      setTitle("");
      setTempTodos([]);
      setIsOpen(false);
    }
  };

  useEffect(
    function () {
      localStorage.setItem("todos", JSON.stringify(todoArray));
    },
    [todoArray]
  );

  return (
    <div className="flex flex-col w-full gap-5">
      <h1 className="text-black font-semibold dark:text-white text-xl">
        My Todos
      </h1>
      <div className="flex flex-row w-full h-full relative justify-center">
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="bg-blue-800 cursor-pointer rounded-lg shadow-lg hover:opacity-80 duration-200 transition-all text-white text-xs px-3 py-2 absolute left-0"
          >
            + Add todo
          </button>
        )}

        {isOpen && (
          <TodoForm
            setIsOpen={setIsOpen}
            todoArray={todoArray}
            disPatch={disPatch}
            AddTemptTodo={AddTemptTodo}
            setTodoText={setTodoText}
            todoText={todoText}
            submitTodoList={submitTodoList}
            setTitle={setTitle}
            title={title}
            tempTodos={tempTodos}
          />
        )}

        <Todos
          todoArray={todoArray}
          disPatch={disPatch}
          handleToggletodo={handleToggletodo}
        />
      </div>
    </div>
  );
}

function TodoForm({
  setIsOpen,
  AddTemptTodo,
  setTodoText,
  todoText,
  submitTodoList,
  setTitle,
  title,
  tempTodos,
}) {
  return (
    <div className=" w-[250px] dark:bg-[#0b3954] absolute mt-[50px] gap-4 h-fit p-5 rounded-lg flex shadow-xl flex-col bg-white">
      <span className="w-full flex justify-end">
        <button
          onClick={() => setIsOpen(false)}
          className="text-sm cursor-pointer hover:bg-gray-300 transition-all duration-200 text-red-500 px-2 rounded"
        >
          x
        </button>
      </span>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        type="text"
        placeholder="title"
        className="border px-3 dark:text-neutral-200 placeholder:dark:text-neutral-400 text-xs py-2 outline-none border-gray-400 rounded-lg"
      />
      <div className="w-full flex flex-row justify-between gap-1">
        <input
          value={todoText}
          onChange={(e) => setTodoText(e.target.value)}
          type="text"
          placeholder="todo"
          className="border px-3 dark:text-neutral-200 placeholder:dark:text-neutral-400 text-xs w-[75%] py-2 outline-none border-gray-400 rounded-lg"
        />
        <button
          onClick={AddTemptTodo}
          className="text-sm cursor-pointer bg-gray-300 transition-all duration-200 px-2 rounded"
        >
          add
        </button>
      </div>

      <ul className="flex flex-col text-xs h-[70px] gap-1 overflow-y-auto">
        {tempTodos.map((tempTodo) => (
          <li key={tempTodo.id} className="flex flex-row items-center">
            <LuDot size={20} />
            <p>{tempTodo.text}</p>
          </li>
        ))}
      </ul>
      <button
        onClick={submitTodoList}
        className="bg-blue-800 cursor-pointer rounded-lg shadow-lg hover:opacity-80 duration-200 transition-all text-white text-xs px-3 py-2 "
      >
        Save todos
      </button>
    </div>
  );
}
