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
    onClose();
  };

  return (
    <div
      id="sidebar"
      className={`fixed right-0 top-0 h-screen w-full sm:w-[340px] max-w-sm bg-white shadow-[-8px_0_30px_-10px_rgba(0,0,0,0.12)] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] z-50 border-l border-gray-100 ${
        isOpen
          ? "translate-x-0 visible opacity-100"
          : "translate-x-full invisible opacity-0"
      }`}
      onMouseLeave={onMouseLeave}
    >
      {/* Sidebar Header */}
      <div className="h-[72px] flex items-center justify-between px-6 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-gray-900 to-gray-700 flex items-center justify-center shadow-md">
            <span className="text-white text-sm font-bold">क</span>
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900 leading-tight tracking-tight">
              Kalaam
            </h2>
            <p className="text-[10px] text-gray-400 font-medium tracking-[0.15em] uppercase leading-tight">
              The Poetry Club
            </p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-all duration-200"
        >
          <AiOutlineClose className="text-lg" />
        </button>
      </div>

      <div className="flex flex-col h-[calc(100vh-72px)] overflow-y-auto custom-scrollbar">
        {/* Navigation Items */}
        <div className="px-3 pt-6 pb-4">
          <p className="px-4 text-[10px] font-semibold text-gray-400 tracking-[0.15em] uppercase mb-3">
            Navigation
          </p>
          <div className="space-y-1">
            {menuItems.map((item, index) => {
              const isActive = pathname === item.route;
              return (
                <div
                  key={item.label}
                  onClick={() => handleNavigation(item.route)}
                  className={`group flex items-center gap-3.5 px-4 py-3 rounded-xl cursor-pointer transition-all duration-200 ${
                    isActive
                      ? "bg-gray-900 shadow-lg shadow-gray-900/20"
                      : "hover:bg-gray-50 active:bg-gray-100"
                  }`}
                  style={{
                    animationDelay: isOpen ? `${index * 50}ms` : "0ms",
                  }}
                >
                  <div
                    className={`text-base transition-colors duration-200 ${
                      isActive
                        ? "text-white"
                        : "text-gray-400 group-hover:text-gray-600"
                    }`}
                  >
                    {item.icon}
                  </div>
                  <span
                    className={`text-sm font-medium transition-colors duration-200 ${
                      isActive
                        ? "text-white"
                        : "text-gray-600 group-hover:text-gray-900"
                    }`}
                  >
                    {item.label}
                  </span>
                  {isActive && (
                    <div className="ml-auto w-1.5 h-1.5 rounded-full bg-white/80"></div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Account Section */}
        {!isAuthenticated && (
          <div className="px-3 pb-4">
            <div className="border-t border-gray-100 pt-5 mx-1">
              <p className="px-4 text-[10px] font-semibold text-gray-400 tracking-[0.15em] uppercase mb-3">
                Account
              </p>
              <div className="px-3">
                <AccountOrSighIn />
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-auto border-t border-gray-100">
          <div className="p-6">
            <p className="text-[10px] font-semibold text-gray-400 tracking-[0.15em] uppercase mb-4">
              Connect With Us
            </p>
            <div className="flex items-center gap-2">
              {[
                {
                  icon: <FaWhatsapp />,
                  color: "hover:bg-green-50 hover:text-green-600",
                  label: "WhatsApp",
                },
                {
                  icon: <FaFacebook />,
                  color: "hover:bg-blue-50 hover:text-blue-600",
                  label: "Facebook",
                },
                {
                  icon: <FaInstagram />,
                  color: "hover:bg-pink-50 hover:text-pink-600",
                  label: "Instagram",
                },
                {
                  icon: <FaTwitter />,
                  color: "hover:bg-sky-50 hover:text-sky-500",
                  label: "Twitter",
                },
              ].map((social) => (
                <button
                  key={social.label}
                  className={`w-10 h-10 flex items-center justify-center rounded-xl text-gray-400 transition-all duration-200 ${social.color}`}
                  title={social.label}
                >
                  <span className="text-lg">{social.icon}</span>
                </button>
              ))}
            </div>
          </div>
          <div className="px-6 pb-5">
            <p className="text-[10px] text-gray-300 font-medium">
              © {new Date().getFullYear()} Kalaam · NIT Rourkela
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
