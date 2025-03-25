import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteNote } from "./apiNotes";
import toast from "react-hot-toast";

export function NoteItem({ note, setShowForm }) {
  const queryClient = useQueryClient();

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
      className={`w-[300px] shadow-lg h-fit p-4 rounded-lg flex flex-col gap-3 ${
        deleting && "opacity-40"
      }`}
    >
      <span className="w-full justify-end gap-1 flex text-xs">
        <FaEdit className=" cursor-pointer" onClick={() => setShowForm(true)} />
        <MdDelete
          onClick={() => mutate(note.id)}
          className="text-red-700 cursor-pointer"
        />
      </span>
      <h1 className="text-sm font-semibold capitalize">{note.title}</h1>
      <p className="text-xs break-words">{note.content}</p>
      <span className="w-full flex justify-end">
        <p className="text-[10px] text-gray-600 mt-3">323887</p>
      </span>
    </div>
  );
}
