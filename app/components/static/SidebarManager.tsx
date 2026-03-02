"use client";
import { useCallback, useState, useEffect } from "react";
import { FaBars } from "react-icons/fa";
import Sidebar from "./Sidebar";
import { AiOutlineClose } from "react-icons/ai";

export default function SidebarManager({
  isAuthenticated,
}: {
  isAuthenticated?: boolean;
}) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  // Lock body scroll when sidebar is open
  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isSidebarOpen]);

  const handleMouseEnter = useCallback(() => {
    setSidebarOpen(true);
  }, []);

  const handleMouseLeave = useCallback((e: React.MouseEvent) => {
    const sidebarElement = document.getElementById("sidebar");
    const relatedTarget = e.relatedTarget;

    if (
      sidebarElement &&
      relatedTarget instanceof Node &&
      !sidebarElement.contains(relatedTarget)
    ) {
      setSidebarOpen(false);
    }
  }, []);

  const handleIconClick = useCallback(() => {
    setSidebarOpen((prev) => !prev);
  }, []);

  return (
    <div className="relative z-[60]">
      <div className="flex items-center">
        <button
          onClick={handleIconClick}
          className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-gray-100 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-200"
          aria-label={isSidebarOpen ? "Close menu" : "Open menu"}
        >
          {isSidebarOpen ? (
            <AiOutlineClose className="text-lg text-gray-700" />
          ) : (
            <FaBars className="text-lg text-gray-700" />
          )}
        </button>

        {/* Backdrop overlay */}
        <div
          className={`fixed inset-0 bg-black/20 backdrop-blur-[2px] transition-all duration-300 z-40 ${
            isSidebarOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
          onClick={() => setSidebarOpen(false)}
        />

        <Sidebar
          id="sidebar"
          isOpen={isSidebarOpen}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClose={() => setSidebarOpen(false)}
          isAuthenticated={isAuthenticated}
        />
      </div>
    </div>
  );
}
