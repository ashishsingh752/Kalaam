import { useEffect, useState } from "react";
import "tailwind-scrollbar";
import Members from "./Members";

export default function Member() {
  return (
    <div className="max-w-screen pt-16 md:pl-10 md:pr-10 min-h-screen overflow-auto bg-gray-200 justify-center items-center">
      <div className="pl-10 text-7xl md:text-9xl p-2">
        <div className="pt-2">This is</div>
        <div className="mt-2">
          <div className="text-neutral-600 md:flex">Kalaam</div> Family
        </div>
      </div>
      <div>
        <Members />
      </div>
    </div>
  );
}
