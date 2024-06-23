"use client";
import { useEffect, useState } from "react";
import "tailwind-scrollbar";
import MembersOfClub from "./MembersOfClub";
import { shuffleArray } from "@/lib/utils";
import axios from "axios";

//! this component is to fetch the members data from the database and then display in the members page 
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
    const res = await axios.get(`/api/user/profile`, {
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

export default function Members() {
  const [users, setUsers] = useState<Array<PostType>>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const data = await fetchMembers();
        const shuffledUsers = shuffleArray(data || []);
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
      <div className="w-full h-44 flex justify-center items-center">
        Loading...
      </div>
    );
  }

  return (
    <div>
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
