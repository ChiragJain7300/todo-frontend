"use client";
import { useSession } from "next-auth/react";

export default function useCreateTodo() {
  const { data: session } = useSession();

  async function createTodo(title: string, description: string = "") {
    const result = await fetch("http://localhost:8000/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.accessToken}`,
      },
      body: JSON.stringify({
        title,
        description,
      }),
    });
    const data = await result.json();
    console.log(data);

    return { ok: result.ok, data };
  }
  return { createTodo };
}
