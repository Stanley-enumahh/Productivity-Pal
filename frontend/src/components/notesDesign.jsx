import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

export function Notes({ notes, disPatch, handleEdit }) {
  return (
    <div className="w-full h-[400px] gap-y-4 items-start overflow-y-auto ml-[100px] flex flex-row gap-x-4 flex-wrap">
      {notes.length > 0 ? (
        notes.map((note) => (
          <div
            key={note.id}
            className={`${note.bgColor} w-[300px] shadow-lg h-fit p-4 rounded-lg flex flex-col gap-3`}
          >
            <span className="w-full justify-end gap-1 flex text-xs">
              <FaEdit
                className=" cursor-pointer"
                onClick={() => handleEdit(note)}
              />
              <MdDelete
                onClick={() =>
                  disPatch({ type: "DELETE_NOTE", payLoad: note.id })
                }
                className="text-red-700 cursor-pointer"
              />
            </span>
            <h1 className="text-sm font-semibold capitalize">{note.title}</h1>
            <p className="text-xs break-words">{note.info}</p>
            <span className="w-full flex justify-end">
              <p className="text-[10px] text-gray-600 mt-3">{note.date}</p>
            </span>
          </div>
        ))
      ) : (
        <div className="w-full h-full flex justify-center items-center">
          <p className="text-gray-700 font-bold mr-[100px]">No notes</p>
        </div>
      )}
    </div>
  );
}
