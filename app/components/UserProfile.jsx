import Image from "next/image";
import UserDropdown from "./UserDropdown";
import { useSession } from "next-auth/react";
import { useState } from "react";

export default function UserProfile() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <Image
        src={
          session.user.image ||
          "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI="
        }
        alt="User Profile"
        className="rounded-full h-10  w-10 border cursor-pointer"
        width={100}
        height={100}
        onClick={() => setIsOpen(!isOpen)}
      />
      <div className="absolute mt-5 right-80 ">
        {isOpen && <UserDropdown />}
      </div>
    </div>
  );
}
