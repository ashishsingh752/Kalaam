"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import UsersPost from "./UsersPost";
import ProfileImageUpload from "./ProfileImageUpload";

interface User {
  name?: string;
  email?: string;
  roll_number?: string;
}

interface PostType {
  id: number;
  roll_number: string;
  content: string;
  heading: string;
  image: string;
}

export default function Profile() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/signin");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="flex h-screen items-center justify-center">
        <Image
          className="h-40 w-40"
          src={`https://media.tenor.com/_62bXB8gnzoAAAAj/loading.gif`}
          width={40}
          height={40}
          alt="Loading..."
        />
      </div>
    );
  }

  const user: User | undefined = session?.user as User | undefined;

  return (
    <div className="flex md:p-6 justify-center items-center bg-gray-200 min-h-screen">
      <div className=" md:mx-40 bg-white p-8 w-full">
        {/* Profile heading */}
        <div className="text-2xl flex justify-center font-bold text-blue-500 mb-5">
          Profile
        </div>

        {/* Profile details */}
        <div>
          {/* profile image */}
          <div className="mt-5">
            <ProfileImageUpload />
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col">
              <label className="font-medium">Your Name</label>
              <input
                defaultValue={user?.name || ""}
                placeholder="Your name"
                className="border border-gray-300 rounded-md w-full p-2"
              />
            </div>
            <div className="flex flex-col">
              <label className="font-medium">Your Email</label>
              <input
                defaultValue={user?.email || ""}
                placeholder="Your email"
                className="border border-gray-300 rounded-md w-full p-2"
              />
            </div>
            <div className="flex flex-col">
              <label className="font-medium">Roll Number</label>
              <input
                defaultValue={user?.roll_number || ""}
                placeholder="Roll Number"
                className="border border-gray-300 rounded-md w-full p-2"
              />
            </div>

            <div className="flex flex-col">
              <label className="font-medium">Role/Position</label>
              <input
                defaultValue={"Club Member"}
                placeholder="Roll Number"
                className="border border-gray-300 rounded-md w-full p-2"
              />
            </div>
          </div>

          {/* Update or delete account */}
          <div className="flex justify-between items-center mt-10 gap-4">
            <button className="bg-red-500 text-white px-4 py-2 rounded-md font-medium text-base hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition ease-in-out duration-150  ">
              Delete Account
            </button>
            <button className="bg-blue-500 cursor-pointer text-white px-4 py-2 rounded-md font-medium hover:bg-blue-700 transition ease-in-out duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              Update Account
            </button>
          </div>

          {/* User's posts */}
          <div className="pt-10">
            <div className="text-2xl flex justify-center font-bold text-blue-500 mb-5">
              Your Posts
            </div>
            <UsersPost />
          </div>
        </div>
      </div>
    </div>
  );
}
