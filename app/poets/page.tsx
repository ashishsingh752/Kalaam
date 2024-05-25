"use client";
import minifaker, { arrayElement } from "minifaker";
import "minifaker/locales/en";
import { useEffect, useState } from "react";
// import Story from "./Story";
import "tailwind-scrollbar";
import Suggestion from "../components/Poet";

interface User {
  username: string;
  img: string;
  id: number;
  jobtitle: string;
}

const user = [
  {
    username: "Ashish singh",
    imgSrc:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZmlsZSUyMGltYWdlfGVufDB8fDB8fHww",
    id: 1,
  },
];

export default function Suggestions() {
  const [storyUsers, setStoryUsers] = useState<User[]>([]);
  useEffect(() => {
    const storyUsers: User[] = minifaker.array(15, (i: number) => ({
      username: minifaker.username({ local: "en" }),
      img: `https://i.pravatar.cc/150?img=${Math.ceil(Math.random() * 70)}`,
      id: i,
      jobtitle: minifaker.jobTitle(),
    }));
    setStoryUsers(storyUsers);
    console.log(storyUsers);
  }, []);

  return (
    <div className="max-w-screen  min-h-screen  overflow-auto flex flex-row bg-gray-400  justify-center items-center">
      <div className="flex  p-6 gap-2 m-6 overflow-auto">
        {storyUsers.map((user) => (
          <div key={user.id}>
            <Suggestion
              key={user.id}
              imgSrc={user.img}
              username={user.username}
              jobtitle={user.jobtitle}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
