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
  const [displayCount, setDisplayCount] = useState(9);
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

  const handleShowMore = () => {
    setDisplayCount((prevCount) => prevCount + 6);
  };

  if (isLoading) {
    return (
      <div className="w-full h-44 flex justify-center items-center">
        Loading...
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div className="w-full h-screen pt-10 flex justify-center ">
        No members found...
      </div>
    );
  }

  return (
    <div className="max-w-3xl ">
      <div className="flex flex-wrap gap-2 justify-center pb-10 md:p-6 md:gap-3 mb-0 m-3">
        {users.slice(0, displayCount).map((user) => (
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
      {displayCount < users.length && (
        <div className="flex pt-0 mb-6 p-6 justify-center ">
          <div
            onClick={handleShowMore}
            className=" text-blue-500 hover:cursor-pointer"
          >
            Show More
          </div>
        </div>
      )}
    </div>
  );
}
