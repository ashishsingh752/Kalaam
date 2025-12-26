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
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <div className="relative group cursor-pointer">
          <div className="absolute -inset-0.5 bg-gradient-to-br from-slate-200 to-slate-300 rounded-full opacity-0 group-hover:opacity-100 transition duration-500 blur-[1px]"></div>
          {session && session.user ? (
            <Image
              src={session?.user?.image || defaultImageUrl}
              alt="User Profile"
              width={56}
              height={56}
              className="relative rounded-full w-14 h-14 object-cover border-[3px] border-slate-50 shadow-sm"
            />
          ) : (
            <Image
              src={defaultImageUrl}
              alt="Default Profile"
              className="relative rounded-full w-14 h-14 object-cover border-2 border-white"
              width={56}
              height={56}
            />
          )}
        </div>

        <div className="flex-1 min-w-0">
          {session ? (
            <>
              <h2 className="font-bold text-slate-800 truncate">
                {session?.user?.name}
              </h2>
              <p className="text-slate-500 text-sm">Welcome to Kalaam</p>
            </>
          ) : (
            <>
              <h2 className="font-bold text-slate-800">Guest User</h2>
              <p className="text-slate-500 text-sm">Please log in</p>
            </>
          )}
        </div>
      </div>

      {session && (
        <button
          onClick={() => signOut()}
          className="w-full mt-2 py-2 px-4 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-red-500 hover:border-red-100 transition-all duration-200 flex items-center justify-center gap-2 group"
        >
          <svg
            className="w-4 h-4 group-hover:text-red-500 transition-colors"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
          Sign Out
        </button>
      )}
    </div>
  );
}
