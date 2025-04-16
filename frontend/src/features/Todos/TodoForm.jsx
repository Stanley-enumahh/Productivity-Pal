import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { TiDeleteOutline } from "react-icons/ti";
import { useTodos } from "../../context/TodoContext";
import { DatePicker } from "antd";
import dayjs from "dayjs";

export const TodoForm = () => {
  const {
    handleClose,
    setDueDate,
    handleCreate,
    dueDate,
    mode,
    isLoading,
    handleUpdate,
    setIsOpen,
    selectedTodo,
  } = useTodos();
  const [tempTodos, setTempTodos] = useState([]);
  const [name, setName] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const formatDate = (dateStr) => dateStr.split("T")[0];

  const onDateChange = (date, dateString) => {
    setDueDate(dateString);
  };

  useEffect(() => {
    if (mode === "editing" && selectedTodo) {
      setValue("title", selectedTodo.title || "");
      setTempTodos(
        selectedTodo.todoitems?.map((item) => ({
          tempId: crypto.randomUUID(), // add tempId for deletion
          title: item.title,
        })) || []
      );
      if (selectedTodo.due_date) {
        setDueDate(selectedTodo.due_date); // store as string for formatting
      }
    }
  }, [mode, selectedTodo, setValue]);

  const onSubmit = async (data) => {
    if (mode === "creating") {
      handleCreate({
        title: data.title,
        due_date: formatDate(dueDate),
        todoitems: tempTodos.map((todo) => ({
          title: todo.title,
        })),
      });
    } else if (mode === "editing") {
      handleUpdate(selectedTodo.id, {
        title: data.title,
        due_date: formatDate(dueDate),
        todoitems: tempTodos.map((todo) => ({
          title: todo.title,
        })),
      });
    }

    reset();
    setIsOpen(false);
    console.log();
  };

  //add individual tods items
  function handleAddTodo() {
    if (name.trim() === "") return;
    const newTodo = {
      tempId: crypto.randomUUID(),
      title: name,
    };
    setTempTodos((tempTodos) => [...tempTodos, newTodo]);
    setName("");
  }

  function handleDeleteTodo(id) {
    setTempTodos((todos) => todos.filter((todo) => todo.tempId !== id));
  }
  return (
    <div className="flex flex-col w-[400px] border border-[#CBD5E1] min-h-[330px] top-[185px] absolute gap-7 rounded-xl left-[50px] bg-white shadow-xl px-6 py-8">
      <div className="flex flex-col gap-4 w-full">
        <h1 className="text-[16px] font-normal">Add a note</h1>
        <div className=" gap-3 rounded-lg w-full flex flex-col transition-all duration-200">
          <div className="flex flex-col gap-3">
            <label htmlFor="title" className="text-sm font-normal">
              Title
            </label>
            <input
              {...register("title", { required: "this field is required" })}
              type="text"
              placeholder="write the title of your note"
              className="border px-3 text-[#09091480] font-normal text-[16px] text-xs py-2 outline-none border-[#CBD5E1] rounded-lg bg-[#F8FAFC]"
            />
            {errors.title && (
              <p className="text-[10px] text-red-500">{errors.title.message}</p>
            )}
            <DatePicker
              onChange={onDateChange}
              defaultValue={dueDate ? dayjs(dueDate) : null}
            />
          </div>
        </div>
        <div className="flex flex-row w-full justify-between">
          <input
            type="text"
            id=""
            className="border px-3 text-[#09091480] font-normal text-[16px] text-xs py-2 outline-none w-[75%] border-[#CBD5E1] rounded-lg bg-[#F8FAFC]"
            value={name}
            placeholder="enter a todo"
            onChange={(e) => setName(e.target.value)}
          />
          <button
            disabled={isLoading}
            onClick={handleAddTodo}
            className="bg-[#2563EB] cursor-pointer px-6 text-white rounded-lg hover:opacity-80 "
          >
            Add
          </button>
        </div>
        <ul className="grid grid-cols-2 w-full gap-1">
          {tempTodos.map((todo) => (
            <li key={todo.tempId} className="flex flex-row gap-3 items-center">
              <p className="capitalize">{todo.title}</p>

              <TiDeleteOutline
                onClick={() => handleDeleteTodo(todo.tempId)}
                className="cursor-pointer text-red-500"
              />
            </li>
          ))}
        </ul>
      </div>
      <button
        disabled={isLoading}
        onClick={handleSubmit(onSubmit)}
        type="submit"
        className="bg-[#2563EB] cursor-pointer rounded-lg hover:opacity-80 duration-200 transition-all text-white text-xs py-4 "
      >
        {isLoading
          ? mode === "creating"
            ? "Creating note..."
            : "Updating note..."
          : mode === "creating"
          ? "Save Note"
          : "Update Note"}
      </button>
      <button
        onClick={handleClose}
        className="text-[#FF2222] cursor-pointer border rounded-lg hover:opacity-80 duration-200 transition-all font-medium text-xs px-3 py-3 "
      >
        Cancel
      </button>
    </div>
  );
};
