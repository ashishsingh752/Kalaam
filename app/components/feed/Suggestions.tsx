"use client";
import minifaker from "minifaker";
import "minifaker/locales/en";
import { useEffect, useState } from "react";
import "tailwind-scrollbar";
import Suggestion from "../poets/Suggestion";

interface User {
  name: string;
  img: string;
  id: number;
  jobTitle: string;
}

export default function Suggestions() {
  const [storyUsers, setStoryUsers] = useState<User[]>([]);

  useEffect(() => {
    const storyUsers: User[] = Array.from({ length: 20 }, (_, i) => ({
      name: minifaker.name({ locale: "en" }),
      img: `https://i.pravatar.cc/150?img=${Math.ceil(Math.random() * 70)}`,
      id: i,
      jobTitle: minifaker.jobTitle(),
    }));
    setStoryUsers(storyUsers);
    console.log(storyUsers);
  }, []);

  return (
    <div className="flex h-1/6 overflow-x-scroll scrollbar-none flex-wrap p-6 bg-white mt-4">
      <div>
        {storyUsers.map((user) => (
          <Suggestion
            key={user.id}
            imgSrc={user.img}
            name={user.name}
            jobtitle={user.jobTitle}
          />
        ))}
      </div>
    </div>
  );
}
