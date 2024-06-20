"use client";

import { HandleDeleteAccount } from "@/app/components/buttons/Button";
import ProfileImageUpload from "@/app/components/user/ProfileImageUpload";
import UsersPostWrapper from "@/app/components/user/UsersPost";
import Env from "@/app/config/env";
import axios from "axios";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface User {
  name?: string;
  email?: string;
  roll_number?: string;
  image?: string;
  role?: string;
}

export default function Profile() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [userName, setUserName] = useState<string>("");
  const [userEmail, setUserEmail] = useState<string>("");
  const [userRollNumber, setUserRollNumber] = useState<string>("");
  const [userRole, setUserRole] = useState<string>("");
  const [profileImage, setProfileImage] = useState<File | null>(null);

  const signOutUser = async () => {
    await signOut();
  };

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/signin");
    } else if (status === "authenticated" && session?.user) {
      const user = session.user as User;
      setUserName(user.name || "");
      setUserEmail(user.email || "");
      setUserRollNumber(user.roll_number || "");
      setUserRole(user.role || "");
      
    }
  }, [status, router, session]);

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

  const handleImageUpload = (file: File) => {
    setProfileImage(file);
  };

  const handleUpdate = async () => {
    const formData = new FormData();
    formData.append("name", userName);
    formData.append("email", userEmail);
    formData.append("roll_number", userRollNumber);
    formData.append("role", userRole);
    if (profileImage) {
      formData.append("profileImage", profileImage);
    }

    try {
      const res = await axios.post("/api/user/profile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.status === 200) {
        alert(
          "User updated successfully!. Please sign in again to see the changes."
        );
        await signOutUser();
      } else {
        alert("Failed to update user");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred while updating the user");
    }
  };

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
            <ProfileImageUpload
              imageUrl={
                session?.user?.image ||
                "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI="
              }
              onUpload={handleImageUpload}
            />
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col">
              <label className="font-medium">Your Name</label>
              <input
                onChange={(e) => setUserName(e.target.value)}
                value={userName}
                placeholder="Your name"
                className="border border-gray-300 rounded-md w-full p-2"
              />
            </div>
            <div className="flex flex-col">
              <label className="font-medium">Your Email</label>
              <input
                onChange={(e) => setUserEmail(e.target.value)}
                value={userEmail}
                placeholder="Your email"
                className="border border-gray-300 rounded-md w-full p-2"
              />
            </div>
            <div className="flex flex-col">
              <label className="font-medium">Roll Number</label>
              <input
                onChange={(e) => setUserRollNumber(e.target.value)}
                value={userRollNumber}
                placeholder="Roll Number"
                className="border border-gray-300 rounded-md w-full p-2"
              />
            </div>
            <div className="flex flex-col">
              <label className="font-medium">Role/Position</label>
              <input
                onChange={(e) => setUserRole(e.target.value)}
                value={userRole}
                placeholder="Role/Position"
                className="border border-gray-300 rounded-md w-full p-2"
              />
            </div>
          </div>

          {/* Update or delete account */}
          <div className="flex justify-between items-center mt-10 gap-4">
            <HandleDeleteAccount />
            <div
              onClick={handleUpdate}
              className="bg-blue-500 cursor-pointer text-white px-4 py-2 rounded-md font-medium text-base hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition ease-in-out duration-150"
            >
              Update Account
            </div>
          </div>
          <div className="pt-10">
            <div className="text-2xl flex justify-center font-bold text-blue-500 mb-5">
              Your Posts
            </div>
            <UsersPostWrapper />
          </div>
        </div>
      </div>
    </div>
  );
}
