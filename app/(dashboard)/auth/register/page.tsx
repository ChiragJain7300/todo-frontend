"use client";
import handleRegisterSubmit from "@/libs/helperFunctions";
import { signIn } from "next-auth/react";
import React, { FormEvent, useState } from "react";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const result = await handleRegisterSubmit(email, password, name);
    console.log(result);
    if (result.success) {
      await signIn("credentials", {
        email,
        password,
        redirect: true,
        callbackUrl: "/",
      });
    } else {
      alert(result.message);
    }
  };
  return (
    <div className="my-12 w-full max-w-md mx-auto bg-white p-5 text-black font-mono rounded-lg">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <div>
          <h1 className="text-xl capitalize font-bold">create account</h1>
          <p className="text-sm">Sign up to start managing your todos</p>
        </div>

        <div className="flex flex-col w-full gap-1">
          <label htmlFor="email" className="font-semibold">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.currentTarget.value)}
            className="py-2 px-3 border text-xs rounded-md"
            required
          />
        </div>

        <div className="flex flex-col w-full gap-1">
          <label htmlFor="password" className="font-semibold">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value)}
            className="py-2 px-3 border  text-xs rounded-md"
            required
          />
        </div>

        <div className="flex flex-col w-full gap-1">
          <label htmlFor="name" className="font-semibold">
            Name
          </label>
          <input
            type="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.currentTarget.value)}
            className="py-2 px-3 border  text-xs rounded-md"
          />
        </div>

        <button
          className="py-2 px-3 bg-green-400 text-lg rounded-md text-white font-bold cursor-pointer mt-2"
          type="submit"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
