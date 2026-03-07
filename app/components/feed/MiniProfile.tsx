"use client";
import Env from "@/app/config/env";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";

//! mini profile component for the feed. It will show the user profile image and name. Status: 200
export default function MiniProfile() {
  const { data: session } = useSession();
  const defaultImageUrl =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRR_bwZrOyCQJhPMvpxqrv-xmqEBzAJAKJtT-VpWkSQ-4AppODnHxANcPsX-RTiIYlcrXE&usqp=CAU"
  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <div className="relative group cursor-pointer">
          <div className="absolute -inset-0.5 bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-600 dark:to-slate-700 rounded-full opacity-0 group-hover:opacity-100 transition duration-500 blur-[1px]"></div>
          {session && session.user ? (
            <Image
              src={session?.user?.image || defaultImageUrl}
              alt="User Profile"
              width={56}
              height={56}
              className="relative rounded-full w-14 h-14 object-cover border-[3px] border-slate-50 dark:border-slate-700 shadow-sm"
            />
          ) : (
            <Image
              src={defaultImageUrl}
              alt="Default Profile"
              className="relative rounded-full w-14 h-14 object-cover border-2 border-white dark:border-slate-700"
              width={100}
              height={100}
            />
          )}
        </div>

        <div className="flex-1 min-w-0">
          {session ? (
            <>
              <h2 className="font-bold text-slate-800 dark:text-slate-200 truncate">
                {session?.user?.name}
              </h2>
              <p className="text-slate-500 dark:text-slate-400 text-sm">
                Welcome to Kalaam
              </p>
            </>
          ) : (
            <>
              <h2 className="font-bold text-slate-800 dark:text-slate-200">
                Guest User
              </h2>
              <p className="text-slate-500 dark:text-slate-400 text-sm">
                Please log in
              </p>
            </>
          )}
        </div>
      </div>

      {session && (
        <button
          onClick={() => signOut()}
          className="w-full mt-2 py-2 px-4 border border-slate-200 dark:border-slate-600 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-red-500 dark:hover:text-red-400 hover:border-red-100 dark:hover:border-red-900 transition-all duration-200 flex items-center justify-center gap-2 group"
        >
          <svg
            className="w-4 h-4 group-hover:text-red-500 dark:group-hover:text-red-400 transition-colors"
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
