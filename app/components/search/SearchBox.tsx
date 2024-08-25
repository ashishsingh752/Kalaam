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
    <div className="flex min-w-auto md:right-auto items-center max-w-lg mx-2 rounded-full relative">
      <input
        type="text"
        className="w-32 sm:w-44 outline outline-slate-500 bg-transparent rounded-full border-none"
        placeholder="Search"
        value={searchTerm}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
      <div className="text-gray-500 flex bg-gray-200 rounded-r-full justify-center items-center w-8 h-full absolute right-0">
        <MagnifyingGlassIcon
          className="cursor-pointer"
          onClick={handleIconClick}
        />
      </div>
    </div>
  );
}
