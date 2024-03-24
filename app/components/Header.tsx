"use client";
import Image from "next/image";
import {
  MagnifyingGlassIcon,
  HomeIcon,
  PlusIcon,
} from "@heroicons/react/24/solid";
import Kalaam_Logo from "@/public/Kalaam_Logo.png";
import { signIn, useSession } from "next-auth/react";

export default function Header() {
  const { data: session } = useSession();

  return (
    <>
      <div className="bg-white z-30 sticky border-b top-0 shadow-sm">
        <div className="flex items-center justify-between max-w-6xl mx-4 xl:mx-auto">
          {/* left side */}

          {/* logo for the lg screen */}
          <div className="cursor-pointer h-24 w-24 relative hidden lg:inline-grid">
            <Image
              src={Kalaam_Logo}
              className=" m-3"
              alt="logo"
              width={100}
              height={100}
            />
          </div>

          {/* Logo  for the small and medium screen */}
          <div className="cursor-pointer h-24 w-24 relative lg:hidden">
            <Image
              src={
                "https://cdn.vectorstock.com/i/preview-1x/78/55/feather-logo-writing-quill-stroke-black-icon-vector-48457855.jpg"
              }
              className="p-2 mx-2 my-1"
              alt="logo"
              width={80}
              height={80}
            />
          </div>

          {/* middle */}
          <div className="relative mt-1">
            <div className="absolute top-2 left-2">
              <MagnifyingGlassIcon className="h-5 text-gray-500" />
            </div>
            <input
              type="text"
              placeholder="Search"
              className="bg-gray-50 pl-10 border-gray-500 text-sm focus:ring-black focus:border-black rounded-md"
            />
          </div>

          <div className="flex justify-center items-center gap-4">
          <HomeIcon className="h-8 hidden md:inline-flex cursor-pointer hover:scale-125 transition-transform duration-200 ease-out" />
          {session ? (
            <>
              {/* Right-side */}
                <PlusIcon className="h-6 font-bold outline rounded-full outline-gray-400 cursor-pointer hover:scale-125 transition-transform duration-200 ease-out" />
                <Image
                  src={
                    session?.user?.image ||
                    "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI="
                  }
                  alt="userProfile"
                  className="cursor-pointer rounded-full h-12 w-12 border p-[2px]"
                  width={70}
                  height={70}
                />
            </>
          ) : (
            <button onClick={() => signIn()}
            className="  bg-blue-500 text-white px-4 py-2 rounded-md font-medium text-base hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition ease-in-out duration-150
            mr-2">Sign in</button>
            )}
            </div>
        </div>
      </div>
    </>
  );
}
