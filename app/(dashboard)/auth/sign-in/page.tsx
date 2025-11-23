"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  async function handleLogin(e: FormEvent) {
    e.preventDefault();

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      alert("Invalid credentials");
      console.log(result?.error);
    } else {
      router.push("/");
    }
  }

  return (
    <div className="p-7 w-full max-w-md mx-auto bg-white text-black rounded-lg my-10">
      <form onSubmit={handleLogin} className="flex flex-col gap-5">
        <div>
          <h1 className="text-xl capitalize font-semibold">sign in</h1>
          <p className="text-sm">Enter your credentials to access your todos</p>
        </div>

        <div className="flex w-full flex-col gap-2">
          <label htmlFor="email" className="font-bold font-mono">
            Email
          </label>
          <input
            name="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.currentTarget.value)}
            className="py-2 px-3 border border-black/70 rounded-md"
          />
        </div>

        <div className="flex w-full flex-col gap-2">
          <label htmlFor="password" className="font-bold font-mono">
            Password
          </label>
          <input
            name="password"
            type="password"
            placeholder="Your password"
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value)}
            className="py-2 px-3 border border-black/70 rounded-md"
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-md py-2 px-3 bg-black text-white font-mono text-lg cursor-pointer hover:bg-gray-900 transition duration-300 font-semibold"
        >
          Login
        </button>
      </form>
    </div>
  );
}
