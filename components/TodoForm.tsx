"use client";
import React, { useState } from "react";
import AddFromModal from "./AddFromModal";

const TodoForm = ({ refresh }: { refresh: () => void }) => {
  const [openModal, setOpenModal] = useState(false);
  return (
    <div className="w-full max-w-md mx-auto py-8">
      <div className="p-4 w-full bg-gray-900 border border-green-500 rounded-md mb-10 hover-effect">
        <button
          onClick={() => setOpenModal(true)}
          className="w-full flex justify-between items-center cursor-pointer"
        >
          <h1 className="text-xl font-semibold capitalize tracking-wider">
            add todo
          </h1>

          <div className="text-2xl border border-gray-500 w-10 h-10 rounded-full   text-center">
            +
          </div>
        </button>
      </div>

      {openModal && (
        <AddFromModal setOpenModal={setOpenModal} refresh={refresh} />
      )}
    </div>
  );
};

export default TodoForm;
