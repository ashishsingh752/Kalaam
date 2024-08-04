"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import DashboardTable from "./DashboardTable";

interface MembersOfClubProps {
  id: number;
  content: string;
  heading: string;
  image: string;
  name: string;
  roll_number: string;
  approved: boolean;
  email: string;
  mobile_number: string;
}

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

export default function Dashboard() {
  const [users, setUsers] = useState<Array<MembersOfClubProps>>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const users = await fetchMembers();
        setUsers(users);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setIsLoading(false);
      }
    };
    getUsers();
  }, []);

  const handleApprove = async (userId: number) => {
    try {
      const response = await axios.put(`/api/user/approve/${userId}`);
      if (response.status === 200) {
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === userId ? { ...user, approved: true } : user
          )
        );
      } else {
        console.error("Failed to approve user");
      }
    } catch (error) {
      console.error("Error approving user:", error);
    }
  };

  const handleDelete = async (userId: number) => {
    const isConfirmed = confirm(
      `Are you sure you want to delete user account?`
    );
    if (!isConfirmed) {
      return;
    }
    try {
      const response = await axios.delete(`/api/user/approve/${userId}`);
      if (response.status === 200) {
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
      } else {
        console.error("Failed to delete user");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="mx-auto min-w-screen min-h-screen py-8 px-2 md:px-10 bg-gray-200 ">
      <h2 className="flex text-2xl justify-center font-bold mb-4">
        Admin Dashboard
      </h2>
      <div className="overflow-x-auto">
        <DashboardTable
          users={users}
          handleApprove={handleApprove}
          handleDelete={handleDelete}
        />
      </div>
    </div>
  );
}
