"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";

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
  console.log(session);

  return (
    <div className="flex items-center  w-80 justify-center absolute  h-auto bg-gray-100">
      <div className="w-full max-w-sm p-5  rounded-lg shadow-md bg-white">
        <div className="flex  flex-col gap-2 justify-center items-center">
          <Image
            className="rounded-full p-1 w-16 h-16"
            src={
              session?.user?.image ||
              "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI="
            }
            width={50}
            height={50}
            alt="userImg"
          />
          <div className="flex flex-col justify-center items-center">
            <div>
              <div className="name font-bold text-xl">
                {session?.user?.name}
              </div>
            </div>
            <div>{session?.user?.email}</div>
          </div>
        </div>
        <br />
        <hr className="my-1" />
        <div className="flex flex-col gap-2">
          <div
            onClick={() => {
              router.push("/profile");
            }}
            className="flex items-center cursor-pointer text-gray-500 text-md hover:bg-gray-100 p-2 rounded-lg"
          >
            Account
          </div>
          <hr />
          <div className="flex items-center text-md text-gray-500  hover:bg-gray-100 p-2 rounded-lg">
            Support
          </div>
          <hr />
          <div
            onClick={() => signOut()}
            className="flex items-center text-md text-gray-500 hover:text-white   hover:bg-red-400 p-2 rounded-lg"
          >
            Log Out
          </div>
          <hr />
        </div>
      </div>
    </div>
  );
};

export default UserDropdown;
