"use client";
import { HomeIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import { signIn, signOut } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { use, useState } from "react";

type ButtonProps = {
  onClick: () => void;
  children: React.ReactNode;
};

interface DeletePostButtonProps {
  id: number;
}

const SignInButton: React.FC<ButtonProps> = ({ onClick, children }) => {
  return (
    <button
      onClick={onClick}
      className="w-full flex justify-center items-center py-2 px-4 text-sm font-medium text-center text-white bg-blue-700 rounded-md hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
    >
      {children}
    </button>
  );
};

const GoogleInButton: React.FC<ButtonProps> = ({ onClick, children }) => {
  return (
    <button
      onClick={onClick}
      className="w-full flex justify-center items-center py-2 px-4 text-sm font-medium text-center text-white bg-blue-700 rounded-md hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
    >
      {children}
    </button>
  );
};

const ClearButton: React.FC = () => {
  return (
    <button className=" p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 hover:bg-gray-200">
      Clear All
    </button>
  );
};

const HomeButton: React.FC = () => {
  const router = useRouter();

  return (
    <HomeIcon
      onClick={() => router.replace("/")}
      className="h-8 cursor-pointer hover:scale-125 transition-transform duration-200 ease-out hidden md:inline-block"
    />
  );
};

const BuyButton: React.FC<ButtonProps> = ({ onClick, children }) => {
  return (
    <button
      onClick={onClick}
      type="button"
      className=" p-2 w-full text-white bg-blue-500 border-t-blue-600 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 hover:bg-blue-600"
    >
      {children}
    </button>
  );
};

const CancleButton: React.FC = () => {
  return (
    <button
      type="button"
      className="p-2 w-full text-black border-t-gray-300 rounded-md outline outline-offset-2 outline-gray-300 hover:bg-gray-200"
    >
      Cancel
    </button>
  );
};

const MainButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <button
      onClick={() => setIsOpen((prev) => !prev)}
      className="p-2 bg-red-100  text-black border-t-gray-300 rounded-md outline outline-offset-2 outline-gray-300 hover:bg-gray-200"
    >
      <div className="flex justify-center items-center gap-3">
        <div className="text-red-500 font-bold">Your Credit: 4</div>
      </div>
    </button>
  );
};

const MyVideoButton: React.FC = () => {
  return (
    <button type="button" className="p-2  text-black underline">
      <div className="flex justify-center underline items-center gap-3">
        <Image
          src={`https://www.svgrepo.com/download/335062/dropdown.svg`}
          className="w-5 h-5"
          alt="new video"
          width={10}
          height={10}
        />
        <div className="text-black font-bold">New Video</div>
      </div>
    </button>
  );
};

const NewVideoButton: React.FC = () => {
  return (
    <button
      type="button"
      className="p-2 bg-blue-500  text-black border-t-gray-300 rounded-md "
    >
      <div className="flex justify-center items-center gap-3">
        <Image
          src={`https://cdn-icons-png.flaticon.com/512/748/748113.png`}
          width={10}
          height={10}
          className="w-5 h-5"
          alt=""
        />
        <div className="text-black font-bold">New Video</div>
      </div>
    </button>
  );
};

const HandleOnClickDirectToHome: React.FC = () => {
  const router = useRouter();
  const handleClick = () => {
    router.replace("/signup");
  };
  return <button onClick={handleClick}>Your or not loggin? Click Here</button>;
};

const HandleOnClickHeaderDirectToHome: React.FC = () => {
  const router = useRouter();
  const handleClick = () => {
    router.replace("/");
  };
  return (
    <button onClick={() => router.replace("/maya")} className="w-full">
      da
    </button>
  );
};

const HandleLoginButtom: React.FC = () => {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push("/signin")}
      className="bg-blue-500 cursor-pointer text-white px-4 py-2 rounded-md font-medium hover:bg-blue-700 transition ease-in-out duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
    >
      Login
    </div>
  );
};

const HandleSignOutButtom: React.FC = () => {
  return (
    <div
      onClick={() => signOut()}
      className="bg-red-500 text-white px-4 py-2 rounded-md font-medium hover:bg-blue-700 transition ease-in-out duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
    >
      Login
    </div>
  );
};

const DeletePostButton: React.FC<DeletePostButtonProps> = ({ id }) => {
  const router = useRouter();

  const deletePost = async () => {
    try {
      await axios.delete(`/api/post/${id}`);
      router.refresh();
      console.log("Post deleted successfully");
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
    <button
      onClick={deletePost}
      className="bg-red-500 text-white px-4 py-2 cursor-pointer rounded-md font-medium text-base hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition ease-in-out duration-150"
    >
      Delete
    </button>
  );
};

const ReadUsersPostButton: React.FC<DeletePostButtonProps> = ({ id }) => {
  const router = useRouter();

  const readPost = async () => {
    try {
      router.push(`/userposts?id=${id}`);
    } catch (error) {
      console.error("Error reading post:", error);
    }
  };

  return <button onClick={readPost}>Read</button>;
};

const BackToHome: React.FC = () => {
  const router = useRouter();

  return (
    <div
      onClick={() => router.back()}
      className=" flex justify-center items-center text-2xl  underline text-blue-500 cursor-pointer"
    >
      Back
    </div>
  );
};

export {
  SignInButton,
  GoogleInButton,
  ClearButton,
  HomeButton,
  BuyButton,
  CancleButton,
  MainButton,
  NewVideoButton,
  MyVideoButton,
  HandleOnClickDirectToHome,
  HandleLoginButtom,
  HandleOnClickHeaderDirectToHome,
  HandleSignOutButtom,
  DeletePostButton,
  ReadUsersPostButton,
  BackToHome,
};
