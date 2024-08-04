"use client";
import axios from "axios";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import ContactCard from "./ExecutiveBody";

interface PostType {
  id: number;
  name: string;
  image: string;
  email: string;
  roll_number: string;
  mobile_number: string;
  role: string;
}

const fetchMembers = async (): Promise<PostType[]> => {
  try {
    const res = await axios.get(`/api/user/profile`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data?.data || [];
  } catch (error) {
    console.error("Error fetching members:", error);
    throw new Error("Failed to fetch members");
  }
};

const ContactPage: NextPage = () => {
  const [users, setUsers] = useState<Array<PostType>>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const data = await fetchMembers();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching members:", error);
      } finally {
        setIsLoading(false);
      }
    };
    getUsers();
  }, []);

  if (isLoading) {
    return (
      <div className="w-full h-44 flex justify-center items-center">
        <p className="text-xl font-semibold">Loading...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-6 text-center">Contact Us</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {users
          .filter((user) => user.role === "President")
          .map((user) => (
            <ContactCard
              key={user.id}
              name={user.name}
              image={user.image}
              mobile_number={user.mobile_number}
              email={user.email}
              role={user.role}
            />
          ))}
        {users
          .filter((user) => user.role === "Admin")
          .map((user) => (
            <ContactCard
              key={user.id}
              name={user.name}
              image={user.image}
              mobile_number={user.mobile_number}
              email={user.email}
              role={user.role}
            />
          ))}
      </div>
    </div>
  );
};

export default ContactPage;
