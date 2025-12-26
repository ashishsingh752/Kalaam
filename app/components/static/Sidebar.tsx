"use client";
import React from "react";
import {
  FaHome,
  FaBook,
  FaPen,
  FaUsers,
  FaWhatsapp,
  FaFacebook,
  FaInstagram,
  FaTwitter,
} from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { useRouter, usePathname } from "next/navigation";
import AccountOrSighIn from "./AccountOrSighIn";

interface SidebarProps {
  isOpen: boolean;
  onMouseEnter: () => void;
  onMouseLeave: (event: React.MouseEvent) => void;
  onClose: () => void;
  id: string;
  isAuthenticated?: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({
  id,
  isOpen,
  onMouseEnter,
  onMouseLeave,
  onClose,
  isAuthenticated = false,
}) => {
  const router = useRouter();
  const pathname = usePathname();

  const menuItems = [
    { label: "Home", icon: <FaHome />, route: "/" },
    { label: "Members", icon: <FaUsers />, route: "/poets" },
    { label: "Events", icon: <FaBook />, route: "/events" },
    { label: "Post Content", icon: <FaPen />, route: "/newpost" },
    { label: "Contact", icon: <FaUsers />, route: "/contact" },
  ];

  const handleNavigation = (route: string) => {
    router.push(route);
    onClose(); // Close sidebar on navigation
  };

  return (
    <div
      id="sidebar"
      className={`fixed right-0 top-0 h-screen w-80 bg-white/95 backdrop-blur-xl shadow-2xl transition-transform duration-300 cubic-bezier(0.4, 0, 0.2, 1) z-50 pt-0 border-l border-slate-100 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* Sidebar Header */}
      <div className="h-24 flex items-end justify-between pb-6 px-8 bg-gradient-to-b from-slate-50 to-white/50">
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent tracking-tight">
            Kalaam
          </h2>
          <p className="text-xs text-slate-500 font-medium tracking-wide uppercase mt-1">
            The Poetry Club
          </p>
        </div>
        <button
          onClick={onClose}
          className="p-2 rounded-full hover:bg-slate-200/50 text-slate-500 hover:text-slate-700 transition-all duration-200"
        >
          <AiOutlineClose className="text-xl" />
        </button>
      </div>

      <div className="flex flex-col h-[calc(100vh-6rem)] overflow-y-auto custom-scrollbar">
        {/* Navigation Items */}
        <div className="px-4 py-8 space-y-2">
          {menuItems.map((item) => {
            const isActive = pathname === item.route;
            return (
              <div
                key={item.label}
                onClick={() => handleNavigation(item.route)}
                className={`group flex items-center gap-4 px-5 py-4 rounded-2xl cursor-pointer transition-all duration-300 border ${
                  isActive
                    ? "bg-indigo-50 border-indigo-100/50 shadow-sm"
                    : "border-transparent hover:bg-slate-50 hover:border-slate-100"
                }`}
              >
                <div
                  className={`text-xl transition-all duration-300 group-hover:scale-110 group-hover:-rotate-3 ${
                    isActive
                      ? "text-indigo-600"
                      : "text-slate-400 group-hover:text-indigo-500"
                  }`}
                >
                  {item.icon}
                </div>
                <span
                  className={`font-medium tracking-wide ${
                    isActive
                      ? "text-indigo-900"
                      : "text-slate-600 group-hover:text-slate-900"
                  }`}
                >
                  {item.label}
                </span>
                {isActive && (
                  <div className="ml-auto w-2 h-2 rounded-full bg-indigo-500 shadow-md shadow-indigo-200"></div>
                )}
              </div>
            );
          })}

          {!isAuthenticated && (
            <div className="pt-8 mt-4 border-t border-slate-100 mx-2">
              <div className="px-4 font-semibold text-slate-400 text-xs uppercase tracking-wider mb-4 pl-2">
                Account
              </div>
              <div className="px-1 transform transition-transform hover:translate-x-1 duration-300">
                <AccountOrSighIn />
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-auto p-8 bg-slate-50/50 border-t border-slate-100/80 backdrop-blur-sm">
          <div className="text-center space-y-6">
            <div>
              <h3 className="font-semibold text-slate-800 text-sm mb-4">
                Connect With Us
              </h3>
              <div className="flex justify-center gap-6">
                <FaWhatsapp className="text-2xl text-slate-400 hover:text-green-500 hover:scale-110 transition-all duration-300 cursor-pointer hover:drop-shadow-md" />
                <FaFacebook className="text-2xl text-slate-400 hover:text-blue-600 hover:scale-110 transition-all duration-300 cursor-pointer hover:drop-shadow-md" />
                <FaInstagram className="text-2xl text-slate-400 hover:text-pink-500 hover:scale-110 transition-all duration-300 cursor-pointer hover:drop-shadow-md" />
                <FaTwitter className="text-2xl text-slate-400 hover:text-blue-400 hover:scale-110 transition-all duration-300 cursor-pointer hover:drop-shadow-md" />
              </div>
            </div>
            <p className="text-[10px] text-slate-400 font-medium">
              © {new Date().getFullYear()} Kalaam Club. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
