"use client";
import { useEffect, useState } from "react";
import "tailwind-scrollbar";
import MembersOfClub from "./MembersOfClub";
import { shuffleArray } from "@/lib/utils";
import axios from "axios";

interface TeamMembersProps {
  yearIndex: string;
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

const fetchTeamMembers = async (yearIndex: string): Promise<PostType[]> => {
  try {
    const res = await axios.get(`/api/user/team/${yearIndex}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data?.data || [];
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw new Error("Failed to fetch posts");
  }
};

export default function TeamMembers({ yearIndex }: TeamMembersProps) {
  const [users, setUsers] = useState<Array<PostType>>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const data = await fetchTeamMembers(yearIndex);
        const shuffledUsers = shuffleArray(data);
        setUsers(shuffledUsers);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setIsLoading(false);
      }
    };
    getUsers();
  }, [yearIndex]);

  if (isLoading) {
    return (
      <div className="w-full h-44 flex justify-center items-center">
        Loading...
      </div>
    );
  }

  if(users.length === 0) {
    return (
      <div className="w-full h-44 flex justify-center items-center">
        No members found
      </div>
    );
  }



  return (
    <div>
      <div className="flex flex-wrap justify-center pb-2 md:p-6 gap-3 pt-24 mb-0 m-3">
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
