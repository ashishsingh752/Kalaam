"use client";
import minifaker, { arrayElement } from "minifaker";
import "minifaker/locales/en";
import { useEffect, useState } from "react";
import Story from "./Story";
import 'tailwind-scrollbar'


// Note: change the file name from the .tsx to .jsx because minifaker is not supporting in the typescript
// when I will use the actual data then I will change the file extention from the .tsx to .jsx

export default function Stories() {
  const [storyUsers, setStoryUsers] = useState([]);
  useEffect(() => {
    const storyUsers = minifaker.array(20, (i) => ({
      username: minifaker.username({ local: "en" }),
      img: `https://i.pravatar.cc/150?img=${Math.ceil(Math.random() * 70)}`,
      id: i,
    }));
    setStoryUsers(storyUsers);
    console.log(storyUsers);
  }, []);

  return (
    <div className="flex space-x-2 p-6 bg-white m-8 overflow-x-scroll scrollbar-none ">
      {storyUsers.map((user) => (
        <Story
          key={user.id}
          id={user.id}
          imgSrc={user.img}
          username={user.username}
        />
      ))}
    </div>
  );
}
