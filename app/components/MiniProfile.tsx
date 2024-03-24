"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";

export default function MiniProfile() {
  const { data: session } = useSession();

  return (
    <div className="flex  items-center justify-between mt-14 bg-white p-2">
      <Image
        src={
          session?.user?.image ||
          "https://images.unsplash.com/photo-1497316730643-415fac54a2af?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D"
        }
        width={100}
        height={100}
        alt="userprofile"
        objectFit="cover"
        className="rounded-full h-14 w-14 border p-[2px]"
      />
      <div className="flex-1 ml-4">
        {session ? (
          <>
            <h2 className="font-bold">{session?.user?.name}</h2>
            <h3 className="text-gray-400 text-sm">
              Welcome to the Kalaam
            </h3>{" "}
          </>
        ) : (
          <>
            <h2 className="font-bold">You are not Logged in </h2>
            <h3 className="text-gray-400 text-sm">
              Login for better experience
            </h3>
          </>
        )}
      </div>
      {session ? (
        <button
          onClick={() => signOut()}
          className="  bg-red-500 text-white px-4 py-2 rounded-md font-medium text-base hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition ease-in-out duration-150  /* Improved focus styles */
          "
        >
          Sign Out
        </button>
      ) : (
        <p></p>
      )}
    </div>
  );
}
