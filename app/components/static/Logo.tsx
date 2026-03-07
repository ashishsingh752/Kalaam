"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { useTheme } from "../ThemeProvider";

interface LogoProps {
  content: string;
  icon: React.ReactNode;
}

const Logo: React.FC<LogoProps> = ({ content, icon }) => {
  return (
    <div className="flex items-center gap-4 p-4 pl-10 bg-white dark:bg-slate-800 hover:bg-gray-300 dark:hover:bg-slate-700 transition-colors duration-200">
      <div className="text-xl">{icon}</div>
      <div className="font-semibold dark:text-gray-200">{content}</div>
    </div>
  );
};

const HeaderLogo: React.FC = () => {
  const router = useRouter();
  const { theme } = useTheme();
  const handelHome = () => {
    router.push("/");
  };

  const logoSrc =
    theme === "dark" ? "https://res.cloudinary.com/dkm6extdv/image/upload/v1772826185/kalaam-logo-light_tk0dg6.png" : "https://res.cloudinary.com/dkm6extdv/image/upload/v1772826431/kalaam-logo_chdofs.png";

  return (
    <div onClick={() => handelHome()} className="flex items-center">
      <div className="flex items-center cursor-pointer">
        <Image
          src={logoSrc}
          alt="Kalaam Logo"
          width={60}
          height={60}
          onClick={() => handelHome()}
          className="rounded-full"
        />
      </div>
    </div>
  );
};

export { Logo, HeaderLogo };
