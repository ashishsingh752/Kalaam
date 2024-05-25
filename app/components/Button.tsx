"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

const SignInButton = function () {
  return (
    <>
      <button className="w-full flex justify-center items-center py-2 px-4 text-sm font-medium text-center text-white bg-blue-700 rounded-md hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
        Login
      </button>
    </>
  );
};

const GoogleInButton = function () {
  return (
    <>
      <button className="w-full flex justify-center items-center py-2 px-4 text-sm font-medium text-center text-white bg-blue-700 rounded-md hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
        Continue with Google
      </button>
    </>
  );
};

const ClearButton = function () {

  return (
    <>
      <button
        // onClick={'handleOnClickClear'}
        className=" p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 hover:bg-gray-200"
      >
        Clear All
      </button>
    </>
  );
};

const CrossButton = function () {
  const router = useRouter();
  const handleOnClickCross = function () {
    router.replace("/");
  };
  return (
    <>
      <button
        onClick={handleOnClickCross}
        className=" p-1 text-red-600 mb-7 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 hover:bg-gray-200"
      >
        X
      </button>
    </>
  );
};

const BuyButton = function () {
  return (
    <>
      <button
        type="button"
        className=" p-2 w-full text-white bg-blue-500 border-t-blue-600 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 hover:bg-blue-600"
      >
        Buy
      </button>
    </>
  );
};

const CancleButton = function () {
  return (
    <>
      <button
        type="button"
        className="p-2 w-full text-black border-t-gray-300 rounded-md outline outline-offset-2 outline-gray-300 hover:bg-gray-200"
      >
        Cancel
      </button>
    </>
  );
};

const MainButton = function () {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="p-2 bg-red-100  text-black border-t-gray-300 rounded-md outline outline-offset-2 outline-gray-300 hover:bg-gray-200"
      >
        <div className="flex justify-center items-center gap-3">
          <div className="text-red-500 font-bold">Your Credit: 4</div>
        </div>
      </button>
    </>
  );
};

const MyVideoButton = function () {
  return (
    <>
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
    </>
  );
};

const NewVideoButton = function () {
  return (
    <>
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
    </>
  );
};

const HandleOnClickDirectToHome = function () {
  const router = useRouter();
  const handleClick = () => {
    router.replace("/signup");
  };
  return (
    <>
      <button onClick={handleClick}>Your or not loggin? Click Here</button>
    </>
  );
};

export {
  SignInButton,
  GoogleInButton,
  ClearButton,
  CrossButton,
  BuyButton,
  CancleButton,
  MainButton,
  NewVideoButton,
  MyVideoButton,
  HandleOnClickDirectToHome,
};
