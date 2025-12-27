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

        const allowedRoles = [
          "Faculty Advisor",
          "President",
          "Vice President",
          "Club Coordinator",
          "Admin",
          "Treasurer",
          "Technical Head",
        ];

        // Filter users by allowed roles
        const filteredUsers = data.filter((user) =>
          allowedRoles.includes(user.role)
        );

        // Sort users based on the order in allowedRoles
        const sortedUsers = filteredUsers.sort(
          (a, b) => allowedRoles.indexOf(a.role) - allowedRoles.indexOf(b.role)
        );

        setUsers(sortedUsers);
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
      <div className="flex h-[calc(100vh-4rem)] items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-900 border-t-transparent"></div>
          <p className="text-lg font-medium text-gray-600">Loading Team...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20 pt-10">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Meet Our Leadership
          </h2>
          <p className="mt-4 text-lg leading-8 text-gray-600">
            Dedicated individuals working together to foster creativity and
            linguistic excellence at NIT Rourkela.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {users.map((user) => (
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
    </div>
  );
};

export default ContactPage;
