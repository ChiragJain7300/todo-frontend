import { signOut } from "next-auth/react";

export async function apiFetch(url: string, options: any = {}) {
  const res = await fetch(url, options);

  // If token expired or user unauthorized
  if (res.status === 401) {
    await signOut({ callbackUrl: "/auth/sign-in" });
    return null;
  }

  return res;
}
