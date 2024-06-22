"use client";
import { useEffect, useState } from "react";
import "tailwind-scrollbar";
import MembersOfClub from "./MembersOfClub";
import { shuffleArray } from "@/lib/utils";
import axios from "axios";

interface MembersOfClubProps {
  id: number;
  content: string;
  heading: string;
  image: string;
  name: string;
  roll_number: string;
  role: string;
}

interface PostType {
  id: number;
  content: string;
  heading: string;
  image: string;
  name: string;
  roll_number: string;
  role: string;
}

const fetchMembers = async () => {
  try {
    const res = await axios.get(`api/user/members`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data?.data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw new Error("Failed to fetch posts");
  }
};

export default function Member() {
  const [users, setUsers] = useState<Array<PostType>>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const users = await fetchMembers();
        const shuffledUsers = shuffleArray(users || []);
        setUsers(shuffledUsers);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setIsLoading(false);
      }
    };
    getUsers();
  }, []);

  if (isLoading) {
    return (
      <div className="flex min-h-screen bg-gray-200 justify-center items-center">
        Loading...
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div className="flex min-h-screen bg-gray-200 justify-center items-center">
        No suggestions available
      </div>
    );
  }

  return (
    <div className="max-w-screen pt-16 md:pl-10 md:pr-10 min-h-screen overflow-auto bg-gray-200 justify-center items-center">
      <div className="pl-10 text-7xl md:text-9xl p-2">
        <div className="pt-2">This is</div>
        <div className="mt-2">
          <div className="text-neutral-600 md:flex">Kalaam</div> Family
        </div>
      </div>
      <div className="flex mt-8 flex-row pb-2 p-6 gap-2 mb-0 m-3 overflow-auto">
        {users.map((user) => (
          <div key={user.id}>
            <MembersOfClub
              id={user.id}
              image={user.image}
              name={user.name}
              role={user.role}
              roll_number={user.roll_number}
              heading={user.heading}
              content={user.content}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
