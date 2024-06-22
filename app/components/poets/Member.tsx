"use client";
import { useEffect, useState } from "react";
import "tailwind-scrollbar";
import MembersOfClub from "./MembersOfClub";
import { shuffleArray } from "@/lib/utils";

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

export default function Member() {
  const [users, setUsers] = useState<Array<PostType>>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`api/user/members`, {
          cache: "no-cache",
        });
        if (!res.ok) {
          throw new Error("Failed to fetch users");
        }
        const response = await res.json();
        const shuffledUsers = shuffleArray(response?.data || []);
        setUsers(shuffledUsers);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching users:", error);
        setIsLoading(false);
      }
    };

    fetchUsers();
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
