"use client";
import { useEffect, useState } from "react";
import "tailwind-scrollbar";
import Suggestion from "../poets/Suggestion";
import { shuffleArray } from "@/lib/utils";

interface MembersOfClubProps {
  id: number;
  content: string;
  heading: string;
  image: string;
  name: string;
  roll_number: string;
}

interface PostType {
  id: number;
  content: string;
  heading: string;
  image: string;
  name: string;
  role: string;
  roll_number: string;
}

//  suggestion in the home page 
export default function Suggestions() {
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
    return <div className="flex h-96 justify-center items-center">Loading...</div>;
  }

  if (users.length === 0) {
    return (
      <div className="flex justify-center items-center">
        No suggestions available
      </div>
    );
  }

  return (
    <div className="flex h-1/6 overflow-x-scroll scrollbar-none flex-wrap p-6 bg-white mt-4">
      <div>
        {users.map((user) => (
          <div key={user.id}>
            <Suggestion
              id={user.id}
              image={user.image}
              name={user.name}
              role={user.role}
              heading={user.heading}
              content={user.content}
              roll_number={user.roll_number}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
