import minifaker from "minifaker";
import { useEffect, useState } from "react";
import Story from "./Story";
import "tailwind-scrollbar";

export default function Stories() {
  const [storyUsers, setStoryUsers] = useState<{ id: number; img: string; username: string }[]>([]);

  useEffect(() => {
    const newStoryUsers = minifaker.array(20, (i: number) => ({
      username: minifaker.username({ local: "en" }),
      img: `https://i.pravatar.cc/150?img=${Math.ceil(Math.random() * 70)}`,
      id: i,
    }));
    setStoryUsers(newStoryUsers);
    console.log(newStoryUsers);
  }, []);

  return (
    <div className="flex space-x-2 p-6 bg-white m-8 overflow-x-scroll scrollbar-none">
      {storyUsers.map((user) => (
        <Story
          key={user.id}
          // id={user.id}
          imgSrc={user.img}
          username={user.username}
        />
      ))}
    </div>
  );
}
