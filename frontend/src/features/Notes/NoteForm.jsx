import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { createNote, editNote } from "./apiNotes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function AddNoteForm({ setShowForm, mode = "creating", note = null }) {
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: note || { title: "", content: "", bgColor: "#DAE7FF" },
  });

  const [selectedBg, setSelectedBg] = useState(note?.bgColor || "#DAE7FF");

  const createMutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries(["notes"]);
      reset();
      toast.success("Note created successfully");
      setShowForm(false);
      reset();
    },
    onError: () => {
      toast.error("Error creating note");
    },
  });

  const editMutation = useMutation({
    mutationFn: editNote,
    onSuccess: () => {
      queryClient.invalidateQueries(["notes"]);
      toast.success("Note updated successfully");
      setShowForm(false);
      reset();
    },
    onError: () => {
      toast.error("Error updating note");
    },
  });

  useEffect(() => {
    if (mode === "editing" && note) {
      setValue("title", note.title);
      setValue("content", note.content);
      setSelectedBg(note.bgColor || "#DAE7FF");
    }
  }, [mode, note, setValue]);

  const onSubmit = (data) => {
    const noteData = { ...data, bgColor: selectedBg };
    if (mode === "creating") {
      createMutation.mutate(noteData);
    } else if (mode === "editing" && note) {
      editMutation.mutate({ id: note.id, ...noteData });
    }
    console.log(data);
  };

  const isProcessing =
    createMutation.status === "pending" || editMutation.status === "pending";

  return (
    <div className="flex flex-col w-[500px] border border-[#CBD5E1] h-[580px] top-[185px] absolute gap-7 rounded-xl left-[50px] bg-white shadow-xl px-6 py-8">
      <div className="w-full flex justify-between">
        <h1 className="text-[16px] font-normal">Add a note</h1>
        <div className="flex flex-col items-center justify-center gap-1">
          <div className="flex flex-row gap-2 justify-center">
            {["#DAE7FF", "#FF9292", "#92FF60"].map((color, i) => (
              <span
                // onClick={setSelectedBg(color)}
                key={i}
                className=" cursor-pointer w-[18px] h-[18px]"
                style={{ backgroundColor: color }}
              ></span>
            ))}
          </div>
          <p className="text-xs">note color</p>
        </div>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className=" gap-4 rounded-lg flex flex-col transition-all duration-200"
      >
        <div className="flex flex-col gap-3">
          <label htmlFor="title" className="text-sm font-normal">
            Title
          </label>
          <input
            id="title"
            {...register("title", { required: "this field is required" })}
            type="text"
            placeholder="write the title of your note"
            className="border px-3 text-[#09091480] font-normal text-[16px] text-xs py-2 outline-none border-[#CBD5E1] rounded-lg bg-[#F8FAFC]"
          />
          {errors.title && (
            <p className="text-[10px] text-red-500">{errors.title.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-3">
          <label htmlFor="content" className="text-sm font-normal">
            Note
          </label>
          <textarea
            {...register("content", { required: "this field is required" })}
            placeholder="write the title of your note"
            id="content"
            className="border px-3 text-[#09091480] font-normal text-sm py-2 h-[220px] outline-none border-[#CBD5E1] rounded-lg bg-[#F8FAFC] placeholder:text-[16px]"
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-[#2563EB] cursor-pointer rounded-lg hover:opacity-80 duration-200 transition-all text-white text-xs py-4 "
        >
          {/* {isCreating ? "creating note" : "Save note"} */}
          {isProcessing
            ? mode === "creating"
              ? "Creating note..."
              : "Updating note..."
            : mode === "creating"
            ? "Save Note"
            : "Update Note"}
        </button>
        <button
          onClick={() => setShowForm(false)}
          className="text-[#FF2222] cursor-pointer rounded-lg hover:opacity-80 duration-200 transition-all font-medium text-xs px-3 py-3 "
        >
          Cancel
        </button>
      </form>
    </div>
  );
}
