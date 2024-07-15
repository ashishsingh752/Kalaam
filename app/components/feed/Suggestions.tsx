"use client";
import { useEffect, useState } from "react";
import "tailwind-scrollbar";
import Suggestion from "../poets/Suggestion";
import { shuffleArray } from "@/lib/utils";
import axios from "axios";
import Image from "next/image";

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

// ! fetch members to show the suggestion for the logged-in user only
const fetchMembers = async () => {
  try {
    const res = await axios.get("/api/user", {
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
      <div className="flex h-96 justify-center items-center">
        <Image
          className="h-10 w-10"
          src={`https://media.tenor.com/_62bXB8gnzoAAAAj/loading.gif`}
          width={40}
          height={40}
          alt="Loading..."
        />
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div className="flex justify-center items-center">
        Please Login to see the suggestions
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
