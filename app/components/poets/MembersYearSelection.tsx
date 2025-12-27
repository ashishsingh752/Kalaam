"use client";
import "tailwind-scrollbar";
import { useState } from "react";
import TeamMembers from "./TeamMember";

const Years = [
  { key: "5", year: "Our Alumni" },
  { key: "4", year: "Fourth Year" },
  { key: "3", year: "Third Year" },
  { key: "2", year: "Second Year" },
  { key: "1", year: "First Year" },
];

export default function MembersYearSelection() {
  const [selectedYear, setSelectedYear] = useState<string | null>("Our Alumni");
  const [selectedYearIndex, setSelectedYearIndex] = useState<string>("5");

  return (
    <div className="w-full">
      {/* Scrollable Container for Mobile, Centered for Desktop */}
      <div className="flex overflow-x-auto no-scrollbar md:justify-center items-center gap-3 px-4 py-6">
        {Years.map((year) => {
          const isActive = selectedYearIndex === year.key;
          return (
            <button
              key={year.key}
              onClick={() => {
                setSelectedYear(year.year);
                setSelectedYearIndex(year.key);
              }}
              className={`
                whitespace-nowrap px-6 py-2.5 rounded-full text-sm md:text-base font-medium transition-all duration-300
                ${
                  isActive
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-200 scale-105"
                    : "bg-white text-slate-600 hover:bg-blue-50 hover:text-blue-600 border border-slate-200"
                }
              `}
            >
              {year.year}
            </button>
          );
        })}
      </div>

      {selectedYear && (
        <div className="mt-8 animate-fade-in">
          <div className="flex flex-col items-center">
            {/* Context Heading */}
            <div className="mb-10 text-center">
              <span className="text-blue-500 font-semibold text-sm tracking-widest uppercase mb-2 block">
                Directory
              </span>
              <h3 className="text-3xl font-serif font-bold text-slate-800">
                {selectedYear}
              </h3>
            </div>

            {/* Team Grid */}
            <div className="w-full">
              <TeamMembers yearIndex={selectedYearIndex} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
