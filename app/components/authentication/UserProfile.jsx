"use client";
import Image from "next/image";
import UserDropdown from "./UserDropdown";
import { useSession } from "next-auth/react";
import { useRef, useState } from "react";

//! this is the user profile icon shown in the header. status:200 (all good)
export default function UserProfile() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef();

  const defaultImageUrl =
    "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI=";

  return (
    <div className="relative">
      <div>
        {session && session.user ? (
          <Image
            src={session?.user?.image || defaultImageUrl}
            alt="User Profile"
            width={100}
            height={100}
            className="rounded-full p-1 w-12 h-12"
            onClick={() => setIsOpen(!isOpen)}
          />
        ) : (
          <Image
            src={defaultImageUrl}
            alt="Default Profile"
            className="rounded-full p-1 w-12 h-12"
            width={100}
            height={100}
          />
        )}
      </div>
      <div ref={menuRef} className="absolute mt-5  pl-5 right-80 ">
        {isOpen && <UserDropdown />}
      </div>
    </div>
  );
}
