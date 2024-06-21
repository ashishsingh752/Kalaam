"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";


//  need to check once again
export default function SignIn() {
  const { data: session } = useSession();
  console.log(session);

  if (session && session?.user) {
    return (
      <div className="flex gap-4 ml-14">
        <p className="text-sky-600">{session.user.name}</p>
        <button onClick={() => signOut()} className="text-red-600">
          Signout
        </button>
      </div>
    );
  }

  return (
    <div>
      <button onClick={() => signIn()} className="text-blue-600">
        signin
      </button>
    </div>
  );
}
