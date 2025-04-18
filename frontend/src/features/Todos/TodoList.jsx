import { SearchBar } from "../../components/SearchBar";
import emptyNotes from "../Notes/images/Frame 1000004822.png";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import { useTodos } from "../../context/TodoContext";
import { TodoItem } from "./TodoItem";

export function TodoList() {
  const { todos, isLoading, isError, isOpen, setIsOpen } = useTodos();

  return (
    <div className="flex flex-col w-full gap-4 mt-[30px] pl-[50px]">
      <SearchBar />
      <div className="flex flex-col gap-5">
        <h1 className="text-black dark:text-white text-3xl font-medium mt-7">
          My Todos
        </h1>
        {!isOpen ? (
          <button
            onClick={() => setIsOpen(true)}
            className="bg-[#2563EB] rounded-xl w-fit flex flex-row gap-2 cursor-pointer shadow-lg hover:opacity-80 duration-200 transition-all text-white text-xs px-3 py-2 items-center"
          >
            <p className="px-1 border rounded-full">+</p> <span>Add todo</span>
          </button>
        ) : (
          ""
        )}
      </div>
      <div className="flex flex-row w-full h-full ">
        {isLoading ? (
          <div className="w-full h-[200px] mr-[100px] flex justify-center items-center">
            <Spin indicator={<LoadingOutlined spin />} size="large" />
          </div>
        ) : isError ? (
          <div className="w-full h-[200px] mr-[100px] flex justify-center items-center">
            <p className="text-red-500"> Error loading todos</p>
          </div>
        ) : (
          <ul className="flex flex-row flex-wrap mt-3 gap-x-[50px] gap-y-[30px]">
            {todos.length > 0 ? (
              todos?.map((todo) => <TodoItem key={todo.id} todo={todo} />)
            ) : (
              <div className="flex items-center justify-center w-full">
                <img
                  src={emptyNotes}
                  alt="empty todo"
                  className="w-[280px] ml-[170px] h-[300px] object-cover"
                />
              </div>
            )}
          </ul>
        )}
      </div>
    </div>
  );
}
