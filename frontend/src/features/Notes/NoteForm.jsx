import { useState } from "react";
import { useForm } from "react-hook-form";
import { createNote } from "./apiNotes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function AddNoteForm({ setShowForm }) {
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { mutate, status, error } = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["notes"],
      });
      reset();
      toast.success("note created sucessfully");
    },
    onError: () => {
      console.error("error creating note");
      toast.error("error createing note");
    },
  });

  const onSubmit = (data) => {
    mutate(data);
  };

  const isCreating = status === "pending";

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className=" w-[250px] absolute mt-[60px] top-[160px] left-[30%] gap-4 h-fit p-5 rounded-lg flex shadow-xl flex-col bg-white dark:bg-[#0b3954] transition-all duration-200"
    >
      <span className="w-full flex justify-end">
        <button
          onClick={() => setShowForm(false)}
          className="text-sm cursor-pointer hover:bg-gray-300 transition-all duration-200 text-red-500 px-2 rounded"
        >
          x
        </button>
      </span>
      <input
        {...register("title", { required: "this field is required" })}
        type="text"
        placeholder="title"
        className="border px-3 placeholder:dark:text-neutral-300 dark:text-neutral-200 text-black text-xs py-2 outline-none border-gray-400 rounded-lg"
      />
      <textarea
        {...register("content", { required: "this field is required" })}
        placeholder="note"
        id=""
        className="h-[70px] border placeholder:dark:text-neutral-300 px-3 dark:text-neutral-200 text-black text-xs py-2 outline-none border-gray-400 rounded-lg"
      ></textarea>
      <button
        type="submit"
        className="bg-blue-800 cursor-pointer rounded-lg shadow-lg hover:opacity-80 duration-200 transition-all text-white text-xs px-3 py-2 "
      >
        {isCreating ? "creating note" : "Save note"}
      </button>
    </form>
  );
}
