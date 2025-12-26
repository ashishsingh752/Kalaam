"use client";
import Image from "next/image";
import UserDropdown from "./UserDropdown";
import { useSession } from "next-auth/react";
import { useRef, useState, useEffect } from "react";

//! this is the user profile icon shown in the header. status:200 (all good)
export default function UserProfile() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const defaultImageUrl =
    "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI=";

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative" ref={menuRef}>
      <div>
        {session && session.user ? (
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 rounded-full transition-all hover:scale-105"
          >
            <Image
              src={session?.user?.image || defaultImageUrl}
              alt="User Profile"
              width={48}
              height={48}
              className="rounded-full w-12 h-12 object-cover ring-2 ring-gray-200 hover:ring-gray-300 transition-all"
            />
          </button>
        ) : (
          <Image
            src={defaultImageUrl}
            alt="Default Profile"
            className="rounded-full w-12 h-12 object-cover ring-2 ring-gray-200"
            width={48}
            height={48}
          />
        )}
      </div>
      <div className="absolute mt-2 right-0 z-50">
        {isOpen && <UserDropdown />}
      </div>
    </div>
  );
}
