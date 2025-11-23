"use client";
import useCreateTodo from "@/hooks/create-todo";
import React, { FormEvent, useState } from "react";

const AddFromModal = ({
  setOpenModal,
  refresh,
}: {
  setOpenModal: (open: boolean) => void;
  refresh: () => void;
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const { createTodo } = useCreateTodo();
  const handleClickOverlay = (e: FormEvent) => {
    if (e.target === e.currentTarget) {
      setOpenModal(false);
    }
  };
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const { ok } = await createTodo(title, description);
    if (ok) refresh();
    setOpenModal(false);
  };
  return (
    <div
      className="z-10 bg-gray-800/80 top-0 left-0 fixed w-screen h-screen flex items-center justify-center p-5"
      onClick={handleClickOverlay}
    >
      <div className="w-full max-w-sm bg-white rounded-md text-black p-4 border-2 border-green-500 relative">
        <h1 className="text-center text-2xl text-green-500 font-extrabold mb-5">
          Add Todo
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col w-full gap-1 mb-5">
            <label htmlFor="todoTitle" className="font-bold">
              Title
            </label>
            <input
              type="text"
              className="py-2 px-3 text-xs border border-gray-400 rounded-md"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="flex flex-col w-full gap-1 mb-5">
            <label htmlFor="todoTitle" className="font-bold">
              Description
            </label>
            <textarea
              rows={3}
              className="py-2 px-3 text-xs border border-gray-400 rounded-md w-full"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <button
            className="bg-green-500 text-white w-full py-2 rounded-md cursor-pointer hover:bg-green-500/80 duration-300 tracking-wider"
            type="submit"
          >
            create
          </button>
        </form>
        <button
          className="absolute top-0 right-2 font-bold text-lg w-6 h-6 cursor-pointer flex items-center justify-center rounded-full hover:text-red-500 hover:scale-125 transition duration-300"
          onClick={() => setOpenModal(false)}
        >
          x
        </button>
      </div>
    </div>
  );
};

export default AddFromModal;
