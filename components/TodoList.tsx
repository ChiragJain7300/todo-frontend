"use client";

import { Todo } from "@/app/(dashboard)/page";

interface TodoListProps {
  todos: Todo[];
  handleUpdateTodo: (id: string, completed: boolean) => void;
  handleDeleteTodo: (id: string) => void;
}

export default function TodoList({
  todos,
  handleUpdateTodo,
  handleDeleteTodo,
}: TodoListProps) {
  if (todos.length === 0)
    return <div className="text-center">No Todos yet</div>;

  return (
    <div className="w-full max-w-md mx-auto flex flex-col gap-5">
      <h1 className="text-xl font-semibold">Total ({todos.length})</h1>
      {todos.map((todo) => (
        <div
          key={todo.id}
          className="border border-green-500 py-3 px-4 rounded-md 
                     hover:shadow-md hover:shadow-green-400 hover:scale-[1.02]
                     transition-all duration-200 gap-3 flex flex-col"
        >
          <div className="w-full flex items-center gap-3">
            <input
              type="checkbox"
              className="cursor-pointer"
              checked={!!todo.completed}
              onChange={(e) => handleUpdateTodo(todo.id, e.target.checked)}
            />
            <h2 className="text-lg">{todo.title}</h2>
          </div>

          <span>{todo.description}</span>
          <div className="flex items-center gap-5 justify-center">
            <button
              className="btn-list border-red-400"
              onClick={() => handleDeleteTodo(todo.id)}
            >
              Delete
            </button>
            <button className="btn-list border-green-400">Edit</button>
          </div>
        </div>
      ))}
    </div>
  );
}
