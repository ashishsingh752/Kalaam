"use client";
import { useEffect, useState } from "react";
import "tailwind-scrollbar";
import Suggestion from "../poets/Suggestion";
import { shuffleArray } from "@/lib/utils";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface MembersOfClubProps {
  id: string;
  content: string;
  heading: string;
  image: string;
  name: string;
  roll_number: string;
}

interface PostType {
  id: string;
  userId: string;
  content: string;
  heading: string;
  image: string;
  name: string;
  role: string;
  roll_number: string;
}

// ! fetch members to show the suggestion for the logged-in user only
const fetchMembers = async () => {
  try {
    const res = await axios.get("/api/user/profile", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data?.data;
  } catch (error) {
    console.error("Error fetching members:", error);
    throw new Error("Failed to fetch members");
  }
};

//  suggestion in the home page
export default function Suggestions() {
  const [users, setUsers] = useState<Array<PostType>>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

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
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 p-4 space-y-4">
        <div className="h-4 bg-slate-100 dark:bg-slate-700 rounded w-1/3 animate-pulse mb-4"></div>
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-center gap-3 animate-pulse">
            <div className="w-10 h-10 bg-slate-100 dark:bg-slate-700 rounded-full"></div>
            <div className="flex-1 space-y-2">
              <div className="h-3 bg-slate-100 dark:bg-slate-700 rounded w-2/3"></div>
              <div className="h-2 bg-slate-100 dark:bg-slate-700 rounded w-1/2"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }


  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden">
      <div className="p-4 border-b border-slate-50 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50">
        <h3 className="font-semibold text-slate-700 dark:text-slate-300 text-sm">
          Discover Poets
        </h3>
      </div>

      <div className="p-2">
        {users.slice(0, 5).map((user) => (
          <div key={user.id}>
            <Suggestion
              id={user.id}
              post_id={user.userId}
              userId={user.userId}
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

      <div className="px-4 py-3 border-t border-slate-50 dark:border-slate-700 bg-slate-50/30 dark:bg-slate-800/30 text-center">
        <button
          onClick={() => router.push("/poets")}
          className="text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors"
        >
          See all suggestions
        </button>
      </div>
    </div>
  );
}
