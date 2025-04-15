import { useTodos } from "../../context/TodoContext";

export const TodoItem = ({ todo }) => {
  const { handleDeleteTodo } = useTodos();
  const formatDate = (dateStr) => dateStr.split("T")[0];
  return (
    <div className="flex flex-col">
      {todo.title}
      <p>{formatDate(todo.due_date)}</p>
      <button
        onClick={() => handleDeleteTodo(todo.id)}
        className="text-red-500 text-sm cursor-pointer"
      >
        x
      </button>
      {todo.todoitems.map((todoitem) => (
        <li key={todoitem.id}>
          <p>{todoitem.title}</p>
        </li>
      ))}
    </div>
  );
};
