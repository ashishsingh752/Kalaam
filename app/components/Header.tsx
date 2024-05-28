"use client";
import Image from "next/image";
import { MagnifyingGlassIcon, PlusIcon } from "@heroicons/react/24/solid";
import Kalaam_Logo from "@/public/Kalaam_Logo.png";
import { useSession } from "next-auth/react";
import UserProfile from "./UserProfile";
import SidebarMannager from "./SidebarManager";
import { HandleLoginButtom, HomeButton } from "./Button";

export default function Header() {
  const { data: session } = useSession();

  return (
    <header className="bg-white w-full shadow-sm sticky min-w-full top-0 z-30 border-b">
      <div className="container min-w-full  flex items-center justify-around py-3 px-6">
        {/* Left side */}
        <div className="flex items-center">
          {/* Logo for large screens */}
          <div className="hidden lg:flex items-center cursor-pointer">
            <Image
              src={Kalaam_Logo}
              alt="Kalaam Logo"
              width={100}
              height={100}
            />
          </div>
          {/* <User/> */}
          {/* Logo for small and medium screens */}
          <div className="lg:hidden flex items-center cursor-pointer">
            <Image
              src="https://cdn.vectorstock.com/i/preview-1x/78/55/feather-logo-writing-quill-stroke-black-icon-vector-48457855.jpg"
              alt="Kalaam Logo"
              width={80}
              height={80}
            />
          </div>
        </div>

        {/* Middle - Search bar */}
        <div className="flex min-w-1  items-center flex-grow max-w-lg mx-2 rounded-full p-1 relative">
          <input
            type="text"
            className="flex-grow min-w-1 outline outline-slate-500 bg-transparent p-2 rounded-full border-none"
            placeholder={"Search by writer's name..."}
          />
          <MagnifyingGlassIcon className="text-gray-500 hidden sm:block w-8 h-8 absolute right-2" />
        </div>

        {/* Right side */}
        <div className="flex items-center space-x-4">
          <HomeButton />
          {session ? (
            <>
              <PlusIcon className="h-6 w-6 cursor-pointer hover:scale-125 transition-transform duration-200 ease-out" />
              {/* add user profile dropdowm */}
              <div className="ml-10">
                <UserProfile />
              </div>
            </>
          ) : (
            <>
              {/* login button */}
              <HandleLoginButtom />
            </>
          )}
        </div>
      </div>
      <div className="max-w-0 max-h-0">
        {/* sidebar to be available in all  pages  */}
        <SidebarMannager />
      </div>
    </header>
  );
}
