"use client";
import { PlusIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

export default function CreateNewPostButton() {
  const router = useRouter();
  return (
    <PlusIcon
      onClick={() => router.push("/newpost")}
      className="h-6 w-6 rounded-full  outline outline-gray-600 font-extrabold cursor-pointer hidden md:inline-flex hover:scale-110 transition-transform duration-200 ease-out"

    />
  );
}
