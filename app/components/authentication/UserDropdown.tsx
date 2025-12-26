"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import {
  IoPersonOutline,
  IoHelpCircleOutline,
  IoLogOutOutline,
} from "react-icons/io5";

interface UserProps {
  session: {
    user: {
      image: string;
      email: string;
    };
  };
}

// ! User Dropdown component - Status:200
const UserDropdown: React.FC<UserProps> = () => {
  const router = useRouter();
  const { data: session } = useSession();

  return (
    <div className="w-72 p-4 rounded-xl shadow-xl bg-white border border-gray-100 animate-fadeIn">
      <div className="flex flex-col gap-3 justify-center items-center">
        <Image
          className="rounded-full p-1 w-16 h-16 ring-2 ring-gray-200"
          src={
            session?.user?.image ||
            "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI="
          }
          width={64}
          height={64}
          alt="User Avatar"
        />
        <div className="flex flex-col justify-center items-center">
          <div className="font-bold text-lg text-gray-900">
            {session?.user?.name}
          </div>
          <div className="text-sm text-gray-500">{session?.user?.email}</div>
        </div>
      </div>

      <div className="my-4 border-t border-gray-200"></div>

      <div className="flex flex-col gap-1">
        <button
          onClick={() => {
            router.push("/profile");
          }}
          className="flex items-center gap-3 text-gray-700 text-sm font-medium hover:bg-gray-50 p-3 rounded-lg transition-colors cursor-pointer w-full text-left"
        >
          <IoPersonOutline size={20} className="text-gray-500" />
          <span>Account</span>
        </button>

        <button className="flex items-center gap-3 text-gray-700 text-sm font-medium hover:bg-gray-50 p-3 rounded-lg transition-colors cursor-pointer w-full text-left">
          <IoHelpCircleOutline size={20} className="text-gray-500" />
          <span>Support</span>
        </button>

        <div className="my-1 border-t border-gray-200"></div>

        <button
          onClick={() => signOut()}
          className="flex items-center gap-3 text-red-600 text-sm font-medium hover:bg-red-50 p-3 rounded-lg transition-colors cursor-pointer w-full text-left"
        >
          <IoLogOutOutline size={20} />
          <span>Log Out</span>
        </button>
      </div>
    </div>
  );
};

export default UserDropdown;
