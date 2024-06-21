"use client";
import { useRouter } from "next/navigation";
import React from "react";

export default function CreateNewPostButton() {
  const router = useRouter();
  return (
    <>
      <div
        onClick={() => router.push("/newpost")}
        className=" outline-gray-600  hover:underline cursor-pointer hidden md:inline-flex  transition-transform duration-200 ease-out"
      >
        Post
      </div>
    </>
  );
}
