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
  userId: string;
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
      <div className="w-full h-64 flex flex-col justify-center items-center gap-4">
        <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
        <p className="text-slate-400 font-medium animate-pulse">
          Curating our poets...
        </p>
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div className="w-full py-20 flex flex-col items-center justify-center text-center">
        <div className="bg-slate-100 p-6 rounded-full mb-4">
          <svg
            className="w-12 h-12 text-slate-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
        </div>
        <h4 className="text-xl font-semibold text-slate-700">
          No members found
        </h4>
        <p className="text-slate-500 mt-2">
          We're still updating this generation of poets.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center mb-16">
        {users.slice(0, displayCount).map((user, index) => (
          <div
            key={user.id}
            className="animate-fade-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <MembersOfClub
              id={user.userId}
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
        <div className="flex justify-center pb-12">
          <button
            onClick={handleShowMore}
            className="px-8 py-3 rounded-full border-2 border-blue-600 text-blue-600 font-bold hover:bg-blue-600 hover:text-white transition-all duration-300 shadow-lg shadow-blue-50"
          >
            Discover More Poets
          </button>
        </div>
      )}
    </div>
  );
}
