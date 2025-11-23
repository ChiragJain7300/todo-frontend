import { apiFetch } from "@/libs/api";
import { useSession } from "next-auth/react";

export default function useDeleteTodo() {
  const { data: session } = useSession();

  async function deleteTodo(id: string) {
    const res = await apiFetch(
      `${process.env.NEXT_PUBLIC_API_URL}/todos/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
      }
    );
    const data = await res?.json();

    return { ok: res?.ok, data };
  }
  return { deleteTodo };
}
