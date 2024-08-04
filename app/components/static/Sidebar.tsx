import React from "react";
import {
  FaHome,
  FaUser,
  FaBook,
  FaTrophy,
  FaBriefcase,
  FaHandshake,
  FaPen,
  FaUsers,
  FaWhatsapp,
  FaFacebook,
  FaInstagram,
  FaTwitter,
} from "react-icons/fa";
import { Logo } from "./Logo";
import { useRouter } from "next/navigation";
import AccountOrSighIn from "./AccountOrSighIn";

interface SidebarProps {
  isOpen: boolean;
  onMouseEnter: () => void;
  onMouseLeave: (event: React.MouseEvent) => void;
  id: string;
}

const Sidebar: React.FC<SidebarProps> = ({
  id,
  isOpen,
  onMouseEnter,
  onMouseLeave,
}) => {
  const router = useRouter();

  return (
    <div
      id="sidebar"
      className={`fixed right-0 top-20 sm:mt-1 h-[calc(100vh-5rem)] bg-white shadow-lg rounded-lg transition-transform duration-300 ${
        isOpen
          ? "translate-x-0 overflow-y-scroll scrollbar-none"
          : "translate-x-full "
      }`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{ width: "16rem" }}
    >
      <div className="cursor-pointer pt-10">
        <div onClick={() => router.replace("/")}>
          <Logo content="Home" icon={<FaHome />} />
        </div>
        <div onClick={() => router.push("/poets")}>
          <Logo content="Members" icon={<FaUsers />} />
        </div>
        <div onClick={() => router.push("/events")}>
          <Logo content="Events" icon={<FaBook />} />
        </div>

        {/* <Logo content="Career" icon={<FaBriefcase />} />
        <Logo content="Mentorship" icon={<FaHandshake />} /> */}
        <div onClick={() => router.replace("/newpost")}>
          <Logo content="Post Content" icon={<FaPen />} />
        </div>
        <div onClick={() => router.replace("/contact")}>
          <Logo content="Contact" icon={<FaUsers />} />
        </div>

        <div >
          <AccountOrSighIn />
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
