"use client";

import { useRouter } from "next/navigation";

export default function DashboardButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push("/dashboard")}
      className="text-gray-600 hover:text-black hover:bg-gray-100 px-3 py-2 rounded-md transition-colors duration-200 font-medium hidden md:inline-block"
    >
      Dashboard
    </button>
  );
}
