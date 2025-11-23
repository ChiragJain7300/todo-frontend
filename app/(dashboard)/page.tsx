"use client";
import TodoForm from "@/components/TodoForm";
import TodoList from "@/components/TodoList";
import useDeleteTodo from "@/hooks/delete-todo";
import { useGetTodos } from "@/hooks/get-todo";
import { useUpdateTodo } from "@/hooks/update-todo";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export interface Todo {
  id: string;
  title: string;
  description?: string;
  completed?: boolean;
}

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const { getTodos } = useGetTodos();
  const { data: session } = useSession();

  // Fetch todos on login
  useEffect(() => {
    if (!session?.accessToken) return;

    (async () => {
      const data = await getTodos();
      setTodos(data);
    })();
  }, [session?.accessToken]);

  // Refresh function to pass down
  const { updateTodo } = useUpdateTodo();
  const { deleteTodo } = useDeleteTodo();
  const refresh = async () => {
    const data = await getTodos();
    setTodos(data);
  };

  const handleUpdateTodo = async (id: string, completed: boolean) => {
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, completed } : todo))
    );
    const result = await updateTodo(id, completed);

    if (!result.ok) {
      setTodos((prev) =>
        prev.map((todo) =>
          todo.id === id ? { ...todo, completed: !completed } : todo
        )
      );
    } else {
      refresh();
    }
  };
  async function handleDeleteTodo(id: string) {
    const { ok, data } = await deleteTodo(id);
    console.log(data);

    if (ok) refresh();
  }
  return (
    <>
      {session ? (
        <main className="pb-10 min-h-screen">
          <TodoForm refresh={refresh} />
          <TodoList
            todos={todos}
            handleUpdateTodo={handleUpdateTodo}
            handleDeleteTodo={handleDeleteTodo}
          />
        </main>
      ) : (
        <main>
          <h1 className="text-center font-mono my-16">
            Please login/register to start using the app
          </h1>
        </main>
      )}
    </>
  );
}
