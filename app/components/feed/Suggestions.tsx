"use client";
import minifaker, { arrayElement } from "minifaker";
import "minifaker/locales/en";
import { useEffect, useState } from "react";
import "tailwind-scrollbar";
import Suggestion from "../poets/Suggestion";

interface User {
  name: string;
  img: string;
  id: number;
  jobtitle: string;
}

const user = [
  {
    name: "Ashish singh",
    imgSrc:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZmlsZSUyMGltYWdlfGVufDB8fDB8fHww",
    id: 1,
  },
];

export default function Suggestions() {
  const [storyUsers, setStoryUsers] = useState<User[]>([]);
  useEffect(() => {
    const storyUsers: User[] = minifaker.array(20, (i: number) => ({
      name: minifaker.name({ local: "en" }),
      img: `https://i.pravatar.cc/150?img=${Math.ceil(Math.random() * 70)}`,
      id: i,
      jobtitle: minifaker.jobTitle(),
    }));
    setStoryUsers(storyUsers);
    console.log(storyUsers);
  }, []);

  return (
    <div className="flex h-1/6 overflow-x-scroll scrollbar-none flex-wrap  p-6 bg-white mt-4   ">
      <div>
        {storyUsers.map((user) => (
          <Suggestion
            key={user.id}
            imgSrc={user.img}
            name={user.name}
            jobtitle={user.jobtitle}
          />
        ))}
      </div>
    </div>
  );
}
