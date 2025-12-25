"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { PencilSquareIcon } from "@heroicons/react/24/outline";

export default function CreateNewPostButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push("/newpost")}
      className="group relative inline-flex items-center gap-2 px-6 py-2.5 rounded-lg font-semibold text-white bg-gradient-purple shadow-lg transition-all duration-300 ease-out hover:shadow-xl hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 animate-pulse-subtle"
      aria-label="Create new post"
    >
      <PencilSquareIcon className="w-5 h-5 transition-transform group-hover:rotate-12" />
      <span>Create Post</span>
      <div className="absolute inset-0 rounded-lg bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
    </button>
  );
}
