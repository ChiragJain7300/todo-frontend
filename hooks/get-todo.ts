"use client";

import { apiFetch } from "@/libs/api";
import { useSession } from "next-auth/react";

export function useGetTodos() {
  const { data: session } = useSession();
  async function getTodos() {
    const res = await apiFetch(`${process.env.NEXT_PUBLIC_API_URL}/todos`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.accessToken}`,
      },
    });
    const data = await res?.json();
    return data || [];
  }
  return { getTodos };
}
