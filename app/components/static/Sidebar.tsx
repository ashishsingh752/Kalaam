import React from "react";
import {
  FaHome,
  FaUser,
  FaBook,
  FaTrophy,
  FaLightbulb,
  FaProjectDiagram,
  FaBriefcase,
  FaHandshake,
  FaPen,
  FaUsers,
  FaWhatsapp,
  FaFacebook,
  FaInstagram,
  FaTwitter,
} from "react-icons/fa";
import Logo from "./Logo";
import { useRouter } from "next/navigation";
import { useAsyncPaginate } from "react-select-async-paginate";

interface SidebarProps {
  isOpen: boolean;
  onMouseEnter: () => void;
  onMouseLeave: (event: React.MouseEvent) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  onMouseEnter,
  onMouseLeave,
}) => {
  const router = useRouter();

  return (
    <div
      id="sidebar"
      className={`fixed  top-20 sm:mt-1 h-[calc(100vh-5rem)] bg-white shadow-lg rounded-lg transition-transform duration-300 ${
        isOpen
          ? "translate-x-0 overflow-y-scroll scrollbar-none"
          : "-translate-x-full "
      }`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{ width: "16rem" }}
    >
      <div className="cursor-pointer">
        <div onClick={() => router.replace("/")}>
          <Logo content="Home" icon={<FaHome />} />
        </div>
        <div onClick={() => router.push("/poets")}>
          <Logo content="Explore" icon={<FaUser />} />
        </div>
        <div onClick={() => router.push("/events")}>
          <Logo content="Events" icon={<FaBook />} />
        </div>
        <div onClick={() => router.replace("/executive-body")}>
          <Logo content="Achieve" icon={<FaTrophy />} />
        </div>
        <Logo content="Career" icon={<FaBriefcase />} />
        <Logo content="Mentorship" icon={<FaHandshake />} />
        <div onClick={() => router.replace("/newpost")}>
          <Logo content="Blog" icon={<FaPen />} />
        </div>
        <div onClick={() => router.replace("/executive-body")}>
          <Logo content="Executive Body" icon={<FaUsers />} />
        </div>
      </div>
      <div className="mt-16 bg-slate-200 p-4 rounded-lg">
        <h3 className="text-center font-semibold">Connect With Us</h3>
        <div className="flex cursor-pointer justify-around mt-4 text-2xl">
          <FaWhatsapp className="hover:text-green-600 transition-colors duration-200" />
          <FaFacebook className="hover:text-blue-600 transition-colors duration-200" />
          <FaInstagram className="hover:text-pink-500 transition-colors duration-200" />
          <FaTwitter className="hover:text-blue-400 transition-colors duration-200" />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
