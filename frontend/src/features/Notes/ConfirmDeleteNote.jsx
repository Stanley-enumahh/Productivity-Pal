export const ConfirmDeleteNote = () => {
  return (
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
  );
};
