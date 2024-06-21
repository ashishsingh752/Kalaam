"use client";
import axios from "axios";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";

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

  return (
    <div
      onClick={() => router.replace("/")}
      className="cursor-pointer  hover:underline  ease-out hidden md:inline-block"
    >
      Home
    </div>
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
      className="bg-red-500 cursor-pointer text-white px-4 py-2 rounded-md font-medium text-base hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition ease-in-out duration-150"
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

export {
  HomeButton,
  HandleLoginButtom,
  DeletePostButton,
  ReadUsersPostButton,
  BackToHome,
  HandleDeleteAccount,
  HandleUpdateAccount,
};
