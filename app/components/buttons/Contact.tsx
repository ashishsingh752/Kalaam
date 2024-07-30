"use client";
import { useRouter } from "next/navigation";

export default function Contact() {
  const router = useRouter();
  return (
    <>
      <div
        onClick={() => router.push("/contact")}
        className=" outline-gray-600  hover:underline cursor-pointer hidden md:inline-flex  transition-transform duration-200 ease-out"
      >
        Contact
      </div>
    </>
  );
}
