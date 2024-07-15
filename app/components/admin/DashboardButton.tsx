"use client";

import { useRouter } from "next/navigation";

export default function DashboardButton() {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push("/dashboard")}
      className=" outline-gray-600  hover:underline cursor-pointer hidden md:inline-flex  transition-transform duration-200 ease-out"
    >
      DashBoard
    </div>
  );
}
