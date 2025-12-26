"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import DashboardTable from "./DashboardTable";
import Container from "../Container";
import { IoSearch } from "react-icons/io5";

interface MembersOfClubProps {
  id: number;
  content: string;
  heading: string;
  image: string;
  name: string;
  roll_number: string;
  approved: boolean;
  email: string;
  role: string;
  mobile_number: string;
  userId: string;
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
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<"All" | "Approved" | "Pending">("All");

  useEffect(() => {
    const getUsers = async () => {
      try {
        const users = await fetchMembers();
        setUsers(users);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching members:", error);
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
            user.id === userId
              ? {
                  ...user,
                  approved: true,
                }
              : user
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
      "Are you sure you want to delete user account?"
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

  const handleRoleChange = async (userId: number, role: string) => {
    try {
      const response = await axios.put(`/api/user/role/${userId}`, { role });
      if (response.status === 200) {
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === userId
              ? {
                  ...user,
                  role: role,
                }
              : user
          )
        );
      } else {
        console.error("Failed to change role");
      }
    } catch (error) {
      console.error("Error changing role:", error);
    }
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.roll_number.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilter =
      filter === "All" ||
      (filter === "Approved" && user.approved) ||
      (filter === "Pending" && !user.approved);

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="h-[calc(100vh-80px)] bg-gray-50 py-8 overflow-hidden flex flex-col">
      <Container classNames="h-full flex flex-col">
        <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 flex-shrink-0">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Admin Dashboard
            </h1>
            <p className="text-gray-500 mt-1">
              Manage users, roles, and approvals.
            </p>
          </div>
          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg border border-gray-200 shadow-sm">
            <span className="text-sm font-medium text-gray-500">
              Total Users:
            </span>
            <span className="text-lg font-bold text-gray-900">
              {users.length}
            </span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col flex-1 min-h-0">
          <div className="p-4 border-b border-gray-200 bg-white flex flex-col md:flex-row gap-4 justify-between items-center flex-shrink-0">
            {/* Search */}
            <div className="relative w-full md:w-96">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <IoSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search by name, email, or roll number..."
                className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm py-2"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Filters */}
            <div className="flex items-center space-x-2">
              {(["All", "Approved", "Pending"] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    filter === f
                      ? "bg-black text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className="overflow-auto flex-1 custom-scrollbar">
            <DashboardTable
              users={filteredUsers}
              handleApprove={handleApprove}
              handleDelete={handleDelete}
              handleRoleChange={handleRoleChange}
            />
          </div>
          {filteredUsers.length === 0 && (
            <div className="p-8 text-center text-gray-500 flex-shrink-0">
              No users found matching your search.
            </div>
          )}
        </div>
      </Container>
    </div>
  );
}
