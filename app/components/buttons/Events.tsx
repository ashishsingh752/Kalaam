"use client";
import { useRouter } from "next/navigation";

export default function Events() {
  const router = useRouter();
  return (
    <>
      <div
        onClick={() => router.push("/events")}
        className=" outline-gray-600  hover:underline cursor-pointer hidden md:inline-flex  transition-transform duration-200 ease-out"
      >
        Events
      </div>
    </>
  );
}


