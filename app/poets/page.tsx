"use client";
import minifaker, { arrayElement } from "minifaker";
import "minifaker/locales/en";
import { useEffect, useState } from "react";
// import Story from "./Story";
import "tailwind-scrollbar";
import Suggestion from "../components/poets/Poet";

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
    <div className=" max-w-screen pt-16  md:pl-10 md:pr-10 min-h-screen  overflow-auto  bg-gray-200  justify-center items-center">
      <div className="pl-10 text-7xl  md:text-9xl p-2">
       <div className="pt-2">
        This is 
        </div> 
        <div className="mt-2"> <div className="text-neutral-600 md:flex ">Kalaam</div> Family</div>
      </div>
      <div className="flex mt-8 flex-row pb-2 p-6 gap-2 mb-0 m-3 overflow-auto">
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
