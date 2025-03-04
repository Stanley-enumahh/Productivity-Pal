export function Todos({ todoArray, disPatch, handleToggletodo }) {
  if (todoArray.length === 0)
    return (
      <div className="w-full h-[400px] flex justify-center items-center">
        <h1 className="font-bold text-gray-600">Add some todos</h1>
      </div>
    );
  return (
    <div className="w-full h-[400px] flex flex-row flex-wrap gap-4 ml-[120px] ">
      {todoArray.map((todoList) => (
        <li
          key={todoList.id}
          className="list-none w-[170px] flex flex-col shadow-lg h-fit dark:bg-[#3f4045] dark:text-neutral-200 bg-gray-200 text-sm gap-2 p-4 rounded-lg"
        >
          <span className="w-full flex justify-end">
            <button
              onClick={() =>
                disPatch({ type: "DELETE_TODO", payload: todoList.id })
              }
              className="text-sm cursor-pointer bg-gray-300 transition-all duration-200 text-red-500 px-2 rounded"
            >
              x
            </button>
          </span>
          <h1 className="font-semibold capitalize">{todoList.title}</h1>
          <p
            onClick={() =>
              disPatch({ type: "DELETE_TODO", payload: todoList.id })
            }
          ></p>
          <ul className="flex flex-col gap-2">
            {todoList.todos.map((todo) => (
              <li
                key={todo.id}
                className="text-xs flex flex-row items-center gap-2"
              >
                <input
                  type="checkbox"
                  name=""
                  id=""
                  checked={todo.isCompleted}
                  onChange={() => handleToggletodo(todoList.id, todo.id)}
                />
                <p
                  className={`capitalize ${
                    todo.isCompleted ? "line-through" : ""
                  }`}
                >
                  {todo.text}
                </p>
              </li>
            ))}
          </ul>
        </li>
      ))}
    </div>
  );
}
