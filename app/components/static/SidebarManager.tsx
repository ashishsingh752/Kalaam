"use client";
import { useCallback, useState } from "react";
import { FaBars } from "react-icons/fa";
import Sidebar from "./Sidebar";
import { AiOutlineClose } from "react-icons/ai";

export default function SidebarManager({
  isAuthenticated,
}: {
  isAuthenticated?: boolean;
}) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

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
          className="p-2 rounded-full hover:bg-slate-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-slate-200"
          aria-label={isSidebarOpen ? "Close menu" : "Open menu"}
        >
          {isSidebarOpen ? (
            <AiOutlineClose className="text-xl text-slate-700" />
          ) : (
            <FaBars className="text-xl text-slate-700" />
          )}
        </button>

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
