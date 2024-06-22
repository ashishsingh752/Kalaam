'use client';
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

interface LogoProps {
  content: string;
  icon: React.ReactNode;
}

const Logo: React.FC<LogoProps> = ({ content, icon }) => {
  return (
    <div className="flex items-center gap-4 p-4 pl-10 bg-white hover:bg-gray-300 transition-colors duration-200 ">
      <div className="text-xl">{icon}</div>
      <div className="font-semibold">{content}</div>
    </div>
  );
};

const HeaderLogo: React.FC = () => {
  const router = useRouter();
  const handelHome = () => {
    router.push("/");
  };

  return (
    <div onClick={() => handelHome()} className="flex items-center">
      {/* Logo for large screens */}
      <div className="hidden lg:flex items-center cursor-pointer">
        <Image
          src={
            "https://res.cloudinary.com/dkm6extdv/image/upload/v1718981080/kalaam-images/xgnmihsqctrq7wsvhdlc.png"
          }
          alt="Kalaam Logo"
          width={100}
          height={100}
          onClick={() => handelHome()}
        />
      </div>
      {/* <User/> */}
      {/* Logo for small and medium screens */}
      <div className="lg:hidden flex items-center cursor-pointer">
        <Image
          src="https://cdn.vectorstock.com/i/preview-1x/78/55/feather-logo-writing-quill-stroke-black-icon-vector-48457855.jpg"
          alt="Kalaam Logo"
          width={80}
          height={80}
          onClick={() => handelHome()}
        />
      </div>
    </div>
  );
};

export { Logo, HeaderLogo };
