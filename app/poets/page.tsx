"use client";
import minifaker from "minifaker";
import "minifaker/locales/en";
import { useEffect, useState } from "react";
import "tailwind-scrollbar";
import Suggestion from "../components/poets/Poet";

interface User {
  name: string;
  img: string;
  id: number;
  jobtitle: string;
}

export default function Suggestions() {
  const [storyUsers, setStoryUsers] = useState<User[]>([]);

  useEffect(() => {
    const storyUsers: User[] = Array.from({ length: 15 }, (_, i) => ({
      name: minifaker.name({ locale: "en" }),
      img: `https://i.pravatar.cc/150?img=${Math.ceil(Math.random() * 70)}`,
      id: i,
      jobtitle: minifaker.jobTitle(),
    }));
    setStoryUsers(storyUsers);
    console.log(storyUsers);
  }, []);

  return (
    <div className="max-w-screen pt-16 md:pl-10 md:pr-10 min-h-screen overflow-auto bg-gray-200 justify-center items-center">
      <div className="pl-10 text-7xl md:text-9xl p-2">
        <div className="pt-2">This is</div>
        <div className="mt-2">
          <div className="text-neutral-600 md:flex">Kalaam</div> Family
        </div>
      </div>
      <div className="flex mt-8 flex-row pb-2 p-6 gap-2 mb-0 m-3 overflow-auto">
        {storyUsers.map((user) => (
          <div key={user.id}>
            <Suggestion
              key={user.id}
              imgSrc={user.img}
              name={user.name}
              jobtitle={user.jobtitle}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
