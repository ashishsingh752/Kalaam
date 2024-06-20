"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import Env from "@/app/config/env";

interface UserProps {
  session: {
    user: {
      image: string;
      email: string;
    };
  };
  // onClick: ()=>void;
}
const UserDropdown: React.FC<UserProps> = () => {
  const [user, setUser] = useState(null);
  const supabase = createClientComponentClient();
  const router = useRouter();
  const { data: session } = useSession();
  console.log(session);

  const handleOnClickAccount = function () {
    router.refresh();
    return router.push("/profile");
  };

  return (
    <div className="flex items-center  w-80 justify-center absolute  h-auto bg-gray-100">
      <div className="w-full max-w-sm p-8 rounded-lg shadow-md bg-white">
        <div className="flex items-center">
          <Image
            className="rounded-full w-14 h-14 p-[1px]"
            src={
              session?.user?.image ||
              "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI="
            }
            width={40}
            height={40}
            alt="userImg"
          />
          <div className="flex-1 ml-4">
            <div className="flex justify-between items-center">
              <div className="name font-bold text-xl">
                {session?.user?.name}
              </div>
            </div>
            <div className="overflow-hidden">{session?.user?.email}</div>
          </div>
          {/* <CrossButton /> */}
        </div>
        <br />
        <hr className="my-3" />
        <div className="flex flex-col gap-3">
          <div className="flex items-center hover:bg-gray-100 p-2 rounded-lg">
            <label htmlFor="displayName" className="text-gray-500 text-md  ">
              <button
                onClick={() => {
                  router.push("/profile");
                }}
              >
                Account
              </button>
            </label>
          </div>
          <hr />
          <div className="flex items-center hover:bg-gray-100 p-2 rounded-lg">
            <label
              htmlFor="displayName"
              className="text-sm text-gray-500 font-"
            >
              Support
            </label>
          </div>
          <hr />
          <div className="flex items-center text-sm text-gray-500 hover:text-white   hover:bg-red-400 p-2 rounded-lg">
            <label htmlFor="displayName">
              <button className="text-md " onClick={() => signOut()}>
                Log Out
              </button>
            </label>
          </div>
          <hr />
        </div>
      </div>
    </div>
  );
};

export default UserDropdown;
