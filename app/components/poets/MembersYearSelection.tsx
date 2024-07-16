"use client";
import "tailwind-scrollbar";
import Members from "./Members";
import { useState } from "react";

interface YearProps {
  key: number;
  year: string;
}

const Years: YearProps[] = [
  { key: 5, year: "Our Alumni" },
  { key: 4, year: "Fourth Year" },
  { key: 3, year: "Third Year" },
  { key: 2, year: "Second Year" },
  { key: 1, year: "First Year" },
];

interface HandleOnClickProps {
  year: string;
}

function HandleOnClick({ year }: HandleOnClickProps) {
  return (
    <div className="text-center w-48 h-24 flex justify-center items-center text-3xl font-normal">
      {year}
    </div>
  );
}

export default function MembersYearSelection() {
  const [selectedYear, setSelectedYear] = useState<string | null>("Our Alumni");

  return (
    <div>
      <div className="flex flex-row justify-center gap-2  items-center">
        {Years.map((year) => (
          <div
            key={year.key}
            className="text-lg font-normal md:text-2xl h-20 md:h-24 flex items-center justify-center cursor-pointer w-16 md:w-28 bg-blue-400 shadow-xl  hover:bg-blue-300 p-1 md:p-2 rounded-md"
            onClick={() => setSelectedYear(year.year)}
          >
            <div className="flex text-center bg-fred-400 justify-center">
              {year.year}
            </div>
          </div>
        ))}
      </div>
      {selectedYear && (
        <div className="flex  font-normal justify-center mt-5">
          <HandleOnClick year={selectedYear} />
        </div>
      )}
    </div>
  );
}
