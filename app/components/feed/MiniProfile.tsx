"use client";
import Env from "@/app/config/env";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";

//! mini profile component for the feed. It will show the user profile image and name. Status: 200
export default function MiniProfile() {
  const { data: session } = useSession();
  const defaultImageUrl =
    "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI=";

  return (
    <div className="flex lg:justify-between items-center  mt-7 bg-white p-2">
      <div className="flex gap-2 justify-center items-center">
        {session && session.user ? (
          <Image
            src={session?.user?.image || defaultImageUrl}
            alt="User Profile"
            width={100}
            height={100}
            className="rounded-full p-1 w-14 h-14"
          />
        ) : (
          <Image
            src={defaultImageUrl}
            alt="Default Profile"
            className="rounded-full  w-14 h-14"
            width={100}
            height={100}
          />
        )}
        {session ? (
          <div className="p-2">
            <h2 className="font-bold">{session?.user?.name}</h2>
            <h3 className="text-gray-400 flex text-sm gap-1">
              <span>Welcome to</span>
              <span>Kalaam</span>
            </h3>
          </div>
        ) : (
          <div>
            <h2 className="font-bold">You are not logged in </h2>
            {/* <h3 className="text-gray-400 text-sm">Login to see suggestions.</h3> */}
          </div>
        )}
      </div>

      <div className="">
        {session ? (
          <button
            onClick={() => signOut()}
            className=" bg-red-500 text-white px-3 py-2 rounded-md font-medium text-base hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition ease-in-out duration-150  /* Improved focus styles */
          "
          >
            Sign Out
          </button>
        ) : (
          <p></p>
        )}
      </div>
    </div>
  );
}
