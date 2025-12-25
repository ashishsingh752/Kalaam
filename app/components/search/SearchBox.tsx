"use client";
import { useRouter } from "next/navigation";
import { ChangeEvent, KeyboardEvent, useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

export default function SearchBox() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchTerm.trim() !== "") {
      router.push(`/search?q=${searchTerm}`);
    }
  };

  const handleIconClick = () => {
    if (searchTerm.trim() !== "") {
      router.push(`/search?q=${searchTerm}`);
    } else {
      router.push("/search");
    }
  };

  return (
    <div className="relative flex w-full max-w-xs items-center">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        <MagnifyingGlassIcon
          className="h-4 w-4 text-gray-400"
          aria-hidden="true"
        />
      </div>
      <input
        type="text"
        className="block w-full rounded-full border border-gray-200 bg-gray-50 py-2 pl-10 pr-4 text-sm leading-6 text-gray-900 placeholder-gray-400 transition-all duration-200 focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-100"
        placeholder="Search posts..."
        value={searchTerm}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
}
