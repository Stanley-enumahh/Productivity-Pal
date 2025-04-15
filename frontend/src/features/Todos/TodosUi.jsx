import { useTodos } from "../../context/TodoContext";
import { TodoForm } from "./TodoForm";
import { TodoList } from "./TodoList";

export default function TodosUi() {
  const { isOpen } = useTodos();

  return (
    <div className="relative w-full h-screen overflow-auto">
      <TodoList />
      {isOpen && <TodoForm />}
    </div>
  );
}
