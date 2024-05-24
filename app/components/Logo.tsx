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

export default Logo;
