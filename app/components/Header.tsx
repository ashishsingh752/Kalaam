"use client";
import Image from "next/image";
import {
  MagnifyingGlassIcon,
  HomeIcon,
  PlusIcon,
} from "@heroicons/react/24/solid";
import Kalaam_Logo from "@/public/Kalaam_Logo.png";
import { signIn, useSession } from "next-auth/react";
import UserProfile from "./UserProfile";

export default function Header() {
  const { data: session } = useSession();

  return (
    <header className="bg-white w-full shadow-sm sticky min-w-full top-0 z-30 border-b">
      <div className="container min-w-full  flex items-center justify-between py-3 px-6">
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
        <div className="flex min-w-1 border items-center flex-grow max-w-lg mx-2  rounded-full p-1 relative">
          <input
            type="text"
            className="flex-grow min-w-1 bg-transparent p-2  rounded-full border-none"
            placeholder="Search Poem"
          />
          <MagnifyingGlassIcon className="text-gray-500 w-8 h-8 relative right-2" />
        </div>

        {/* Right side */}
        <div className="flex items-center space-x-4">
          <HomeIcon className="h-8 cursor-pointer hover:scale-125 transition-transform duration-200 ease-out hidden md:inline-block" />
          {session ? (
            <>
              <PlusIcon className="h-6 w-6 cursor-pointer hover:scale-125 transition-transform duration-200 ease-out" />

              {/* add user profile dropdowm */}
              <UserProfile />
              {/* <Image
                src={
                  session.user.image ||
                  "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI="
                }
                alt="User Profile"
                className="rounded-full h-10 w-10 border p-1 cursor-pointer"
                width={40}
                height={40}
              /> */}
            </>
          ) : (
            <button
              onClick={() => signIn()}
              className="bg-blue-500 text-white px-4 py-2 rounded-md font-medium hover:bg-blue-700 transition ease-in-out duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
