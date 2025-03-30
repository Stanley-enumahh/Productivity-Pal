import { BsTrash3 } from "react-icons/bs";
import { LiaEditSolid } from "react-icons/lia";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteNote } from "./apiNotes";
import toast from "react-hot-toast";
import { Modal } from "antd";
import { HiMiniXMark } from "react-icons/hi2";
import { useState } from "react";

export function NoteItem({ note, onEdit }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  const [ShowDeleteModal, setShowDeleteModal] = useState(false);
  const queryClient = useQueryClient();
  const handleDelete = () => {
    setShowDeleteModal(true);
  };

  const showSelectedNoteModal = (note) => {
    setIsModalOpen(true);
    setSelectedNote(note);
  };

  const closeSelectedNotelModal = () => {
    setIsModalOpen(false);
    setSelectedNote(null);
  };

  const { mutate, status, error } = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["notes"],
      });
      toast.success("note deleted sucessfully");
    },
    onError: () => {
      console.error("error deleting note");
      toast.error("error deleting note");
    },
  });

  const deleting = status === "pending";
  return (
    <div
      style={{ backgroundColor: note.BgColor }}
      className={`w-[420px]  shadow-lg h-[315px] p-8 rounded-lg flex flex-col justify-between ${
        deleting && "opacity-40"
      }`}
    >
      <Modal
        open={isModalOpen}
        closeSelectedNotelModal={closeSelectedNotelModal}
        closable={false}
        footer={null}
        style={{ height: "fit-content" }}
      >
        <div className="w-full h-full flex flex-col gap-5 ">
          <span className="w-full flex justify-end">
            <HiMiniXMark
              className="cursor-pointer"
              onClick={closeSelectedNotelModal}
            />
          </span>
          <h1 className="text-[16px] font-medium capitalize w-[70%]">
            {selectedNote?.title}
          </h1>
          <p className="text-sm leading-[24px] font-light break-words">
            {selectedNote?.content}
          </p>
        </div>
      </Modal>

      {/* delte modal */}
      <Modal
        open={ShowDeleteModal}
        closeSelectedNotelModal={closeSelectedNotelModal}
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
                mutate(note.id);
                setShowDeleteModal(false);
              }}
              className="bg-[#FF4444] cursor-pointer text-white w-[150px] py-3 rounded-lg"
            >
              Yes, Delete
            </button>
          </div>
        </div>
      </Modal>

      <div className="flex flex-row justify-between w-full items-start">
        <h1 className="text-[16px] font-medium capitalize w-[70%]">
          {note.title}
        </h1>

        <span className="w-full justify-end items-center gap-4 flex text-[16px]">
          <LiaEditSolid
            size={20}
            className=" cursor-pointer"
            onClick={() => onEdit(note)}
          />
          <BsTrash3
            onClick={handleDelete}
            // onClick={() => mutate(note.id)}
            className=" cursor-pointer text-[#FF0707]"
          />
        </span>
      </div>
      <p className="text-sm leading-[24px] font-light break-words ">
        {note.content.slice(0, 300)}
        {note.content.length > 300 && (
          <button
            onClick={() => showSelectedNoteModal(note)}
            className="cursor-pointer ml-3 font-semibold text-sm"
          >
            See more
          </button>
        )}
      </p>
      <span className="w-full flex justify-end">
        <p className="text-[10px] text-gray-600 mt-3">
          {note.last_updated.slice(0, 10)}
        </p>
      </span>
    </div>
  );
}
