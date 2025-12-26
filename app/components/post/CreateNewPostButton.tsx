"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { PencilSquareIcon } from "@heroicons/react/24/outline";

export default function CreateNewPostButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push("/newpost")}
      className="group relative inline-flex items-center gap-2 px-6 py-2.5 rounded-lg font-semibold text-white bg-gradient-purple shadow-lg transition-shadow duration-300 ease-out hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
      aria-label="Create new post"
    >
      <PencilSquareIcon className="w-5 h-5" />
      <span>Create Post</span>
      <div className="absolute inset-0 rounded-lg bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
    </button>
  );
}
