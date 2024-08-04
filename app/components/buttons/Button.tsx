"use client";
import { HomeModernIcon, MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import { signOut } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { ReactNode } from "react";
import { Logo } from "../static/Logo";
import { FaUser } from "react-icons/fa";

type ButtonProps = {
  onClick: () => void;
  children: ReactNode;
};

interface DeletePostButtonProps {
  id: number;
  heading: string;
}

interface ReadPostButtonProps {
  id: number;
}

const HomeButton: React.FC = () => {
  const router = useRouter();
  const handelHome = () => {
    router.push("/");
  };

  return (
    <div
      onClick={() => handelHome()}
      className="flex hover:underline cursor-pointer items-center"
    >
      Home
    </div>
  );
};
const PostButton = function () {
  const router = useRouter();
  const handelPost = () => {
    router.push("/newpost");
  };

  return (
    <div
      onClick={() => handelPost()}
      className="flex hover:underline cursor-pointer items-center"
    >
      Post
    </div>
  );
};

const HomeButtonWithIcon: React.FC = () => {
  const router = useRouter();
  const handelHome = () => {
    router.push("/");
  };

  return (
    <div
      onClick={() => router.push("/")}
      className="flex hover:underline cursor-pointer items-center"
    >
      <HomeModernIcon className=" h-5 w-5 relative" />
    </div>
  );
};

const HandleLoginButtom: React.FC = () => {
  const router = useRouter();
  return (
    <>
      <div className="flex flex-row gap-1">
        <div
          onClick={() => router.push("/signin")}
          className="cursor-pointer border border-blue-500 text-blue-500 px-4 py-2 rounded-full font-medium hover:bg-blue-500 hover:text-white transition ease-in-out duration-150 focus:outline-1 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Login
        </div>
        <div
          onClick={() => router.push("/signup")}
          className="cursor-pointer border border-blue-500 text-blue-500 px-4 py-2 rounded-full font-medium hover:bg-blue-500 hover:text-white transition ease-in-out duration-150 focus:outline-1 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Register
        </div>
      </div>
    </>
  );
};

const DeletePostButton: React.FC<DeletePostButtonProps> = ({ id, heading }) => {
  const router = useRouter();

  const deletePost = async () => {
    const isConfirmed = confirm(
      `Are you sure? This is will delete "${heading}" post.`
    );
    if (!isConfirmed) {
      return;
    }

    try {
      const result = await axios.delete(`/api/post/${id}`);
      if (result.status === 200) {
        window.location.reload();
      }
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

const ReadUsersPostButton: React.FC<ReadPostButtonProps> = ({ id }) => {
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

const HandleDeleteAccount: React.FC = () => {
  const router = useRouter();

  const deletePost = async () => {
    const isConfirmed = confirm(
      "Are you sure you want to delete your account?"
    );
    if (!isConfirmed) {
      return;
    }

    try {
      const response = await axios.delete(`/api/user`);
      if (response.status === 200) {
        signOut();
        alert("User deleted successfully");
        router.replace("/");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Failed to delete user account. Please try again.");
    }
  };

  return (
    <div
      onClick={deletePost}
      className="bg-red-500 flex text-center cursor-pointer text-white px-4 py-2 rounded-md font-medium text-base hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition ease-in-out duration-150"
    >
      Delete Account
    </div>
  );
};
const HandleUpdateAccount = () => {
  return (
    <div className="bg-blue-500 cursor-pointer text-white px-4 py-2 rounded-md font-medium text-base hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition ease-in-out duration-150  ">
      Update Account
    </div>
  );
};

const HandleSearchRoute = async () => {
  const router = useRouter();

  return (
    <MagnifyingGlassIcon
      className="cursor-pointer"
      onClick={() => router.push("/search")}
    />
  );
};

const HandleNotAdmin = async () => {
  return redirect("/");
};

const HandleAccountButton = function () {
  const router = useRouter();
  return (
    <div onClick={() => router.push("/profile")}>
      <Logo content="Account" icon={<FaUser />} />
    </div>
  );
};

export {
  HandleSearchRoute,
  HomeButton,
  HandleLoginButtom,
  DeletePostButton,
  ReadUsersPostButton,
  BackToHome,
  HandleDeleteAccount,
  HandleUpdateAccount,
  HomeButtonWithIcon,
  HandleNotAdmin,
  HandleAccountButton,
  PostButton,
};
