"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import LogoutButton from "./LogoutButton";

const Header = () => {
  const { data: session } = useSession();
  return (
    <header className="w-full border-b border-green-700">
      <div className="w-full mx-auto max-w-4xl xl:max-w-5xl p-4 flex items-center justify-between">
        <h2 className="text-green-300 text-2xl md:text-3xl font-bold font-mono">
          Todo App
        </h2>

        {session ? (
          <div className="flex gap-5 font-mono items-center">
            <p className="font-bold">
              Hello, {session?.user?.email?.substring(0, 2).toUpperCase()}
            </p>
            <LogoutButton />
          </div>
        ) : (
          <div className="flex gap-5 font-mono">
            <Link href="/auth/sign-in">
              <button className="border border-gray-200 px-5 py-1 rounded-md hover:scale-105 duration-300 cursor-pointer">
                Login
              </button>
            </Link>

            <Link href="/auth/register">
              <button className="border border-gray-200 px-5 py-1 rounded-md hover:scale-105 duration-300 cursor-pointer text-black bg-green-500">
                Register
              </button>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
