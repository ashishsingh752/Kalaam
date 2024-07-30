"use client";
import { useRouter } from "next/navigation";
import React from "react";

export default function MembersButton() {
  const router = useRouter();
  return (
    <>
      <div
        onClick={() => router.push("/poets")}
        className=" outline-gray-600  hover:underline cursor-pointer hidden md:inline-flex  transition-transform duration-200 ease-out"
      >
        Team
      </div>
    </>
  );
}


