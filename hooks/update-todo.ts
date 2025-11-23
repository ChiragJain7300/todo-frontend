"use client";
import { apiFetch } from "@/libs/api";
import { useSession } from "next-auth/react";

export function useUpdateTodo() {
  const { data: session } = useSession();
  async function updateTodo(id: string, completed: boolean) {
    const res = await apiFetch(
      `${process.env.NEXT_PUBLIC_API_URL}/todos/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.accessToken}`,
        },
        body: JSON.stringify({ completed }),
      }
    );
    const data = await res?.json();
    return { ok: res?.ok, data };
  }
  return { updateTodo };
}
