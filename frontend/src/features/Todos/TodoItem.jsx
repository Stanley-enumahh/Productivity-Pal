import { useTodos } from "../../context/TodoContext";
import { BsTrash3 } from "react-icons/bs";
import { LiaEditSolid } from "react-icons/lia";
import { Modal } from "antd";
import { useState } from "react";

export const TodoItem = ({ todo }) => {
  const { handleDeleteTodo, handleEdit, isLoading } = useTodos();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ShowDeleteModal, setShowDeleteModal] = useState(false);
  const formatDate = (dateStr) => dateStr.split("T")[0];

  const handleDelete = () => {
    setShowDeleteModal(true);
  };

  const closeSelectedTodolModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div
      className={`w-[400px] shadow-lg bg-[#E4EDFF] h-[310px] p-10 rounded-lg flex flex-col justify-between ${
        isLoading && "opacity-40"
      }`}
    >
      <Modal
        open={ShowDeleteModal}
        closeSelectedTodolModal={closeSelectedTodolModal}
        closable={false}
        footer={null}
        style={{ width: "250px", height: "240px", backgroundColor: "red" }}
      >
        <div className="w-full items-center h-[240px] justify-center gap-5 text-center flex flex-col">
          <p className="font-medium">Delete note</p>
          <p className="text-xl font-medium">This Cannot Be Undone</p>
          <div className="flex justify-center gap-4">
            <button
              onClick={() => setShowDeleteModal(false)}
              className="bg-[#F8FAFC] cursor-pointer border-[#CBD5E1] border w-[150px] py-3 rounded-lg"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                handleDeleteTodo(todo.id);
                setShowDeleteModal(false);
              }}
              className="bg-[#FF4444] cursor-pointer text-white w-[150px] py-3 rounded-lg"
            >
              Yes, Delete
            </button>
          </div>
        </div>
      </Modal>
      <div className="flex flex-row justify-between">
        <h1 className="text-[16px] font-medium w-full"> {todo.title}</h1>

        <span className="w-full justify-end items-center gap-4 flex text-[16px]">
          <LiaEditSolid
            size={20}
            className=" cursor-pointer"
            onClick={() => handleEdit(todo)}
          />
          <BsTrash3
            onClick={handleDelete}
            className=" cursor-pointer text-[#FF0707]"
          />
        </span>
      </div>

      <div className="flex w-full justify-center items-start">
        <ul className="flex flex-col gap-0">
          {todo.todoitems.map((todoitem) => (
            <li key={todoitem.id}>
              <p className="font-normal text-[16px]">{todoitem.title}</p>
            </li>
          ))}
        </ul>
      </div>
      <span className="w-full flex justify-end">
        <p className="text-sm">due date: {formatDate(todo.due_date)}</p>
      </span>
    </div>
  );
};
