"use client";
import { useCallback, useState } from "react";
import { FaChevronRight } from "react-icons/fa";
import Sidebar from "./Sidebar";

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

  return (
    <div className="shadow-sm border-b">
      {/* <FaChevronRight  className='z-50' /> */}
      <div className="flex min-h-screen">
        <div
          className="fixed top-1/3 left-0 flex items-center px-3 h-16 z-50"
          onMouseEnter={handleMouseEnter}
        >
          <div className="text-2xl cursor-pointer">
            {!isSidebarOpen && <FaChevronRight />}
          </div>
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
