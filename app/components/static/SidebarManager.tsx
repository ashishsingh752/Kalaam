"use client";
import { useCallback, useState } from "react";
import { FaBars } from "react-icons/fa";
import Sidebar from "./Sidebar";
import { AiOutlineClose } from "react-icons/ai";

export default function SidebarManager() {
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
    <div className="shadow-sm border-b">
      <div className="flex">
        <div
          className="flex items-center cursor-pointer"
          onMouseEnter={handleMouseEnter}
        >
          {isSidebarOpen ? (
            <AiOutlineClose
              onClick={handleMouseLeave}
              className="text-2xl bg-white shadow-none"
            />
          ) : (
            <FaBars
              onClick={handleIconClick}
              className="text-2xl bg-white shadow-none"
            />
          )}
        </div>

        <Sidebar
          id="sidebar"
          isOpen={isSidebarOpen}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />
      </div>
    </div>
  );
}
