"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import DashboardTable from "./DashboardTable";
import PaymentsTable, { DonationProps } from "./PaymentsTable";
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
    return res.data?.data || [];
  } catch (error) {
    console.error("Error fetching members:", error);
    return [];
  }
};

const fetchDonations = async () => {
  try {
    const res = await axios.get("/api/admin/donations", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data?.data || [];
  } catch (error) {
    console.error("Error fetching donations:", error);
    return [];
  }
};

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<"Members" | "Payments">("Members");
  const [users, setUsers] = useState<Array<MembersOfClubProps>>([]);
  const [donations, setDonations] = useState<Array<DonationProps>>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<"All" | "Approved" | "Pending">("All");

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      try {
        const [fetchedUsers, fetchedDonations] = await Promise.all([
          fetchMembers(),
          fetchDonations(),
        ]);
        setUsers(fetchedUsers);
        setDonations(fetchedDonations);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    getData();
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
              : user,
          ),
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
      "Are you sure you want to delete user account?",
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
              : user,
          ),
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

  const filteredDonations = donations.filter((donation) => {
    const term = searchQuery.toLowerCase();
    return (
      donation.tier.toLowerCase().includes(term) ||
      donation.razorpayOrderId.toLowerCase().includes(term) ||
      donation.razorpayPaymentId.toLowerCase().includes(term) ||
      (donation.user?.name || "").toLowerCase().includes(term) ||
      (donation.user?.email || "").toLowerCase().includes(term)
    );
  });

  const totalRaised = donations.reduce(
    (sum, current) => sum + current.amount,
    0,
  );

  return (
    <div className="h-[calc(100vh-80px)] bg-gray-50 dark:bg-slate-900 py-8 overflow-hidden flex flex-col">
      <Container classNames="h-full flex flex-col">
        <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 flex-shrink-0">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
              Admin Dashboard
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
              Manage users, roles, approvals, and view support payments.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex bg-gray-200 dark:bg-slate-800 p-1 rounded-xl w-fit">
              <button
                onClick={() => setActiveTab("Members")}
                className={`px-6 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                  activeTab === "Members"
                    ? "bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 shadow-sm"
                    : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                }`}
              >
                Members
              </button>
              <button
                onClick={() => setActiveTab("Payments")}
                className={`px-6 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                  activeTab === "Payments"
                    ? "bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 shadow-sm"
                    : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                }`}
              >
                Payments
              </button>
            </div>

            <div className="flex items-center gap-2 bg-white dark:bg-slate-800 px-4 py-2 rounded-lg border border-gray-200 dark:border-slate-700 shadow-sm">
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                {activeTab === "Members" ? "Total Users:" : "Total Raised:"}
              </span>
              <span className="text-lg font-bold text-gray-900 dark:text-gray-100">
                {activeTab === "Members"
                  ? users.length
                  : `₹${totalRaised.toLocaleString()}`}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 overflow-hidden flex flex-col flex-1 min-h-0">
          <div className="p-4 border-b border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 flex flex-col md:flex-row gap-4 justify-between items-center flex-shrink-0">
            {/* Search */}
            <div className="relative w-full md:w-96">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <IoSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder={
                  activeTab === "Members"
                    ? "Search by name, email, or roll number..."
                    : "Search payments by name, email, or reference ID..."
                }
                className="pl-10 block w-full rounded-md border-gray-300 dark:border-slate-600 dark:bg-slate-700 dark:text-gray-100 shadow-sm focus:border-black dark:focus:border-indigo-500 focus:ring-black dark:focus:ring-indigo-500 sm:text-sm py-2"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Filters (Only for Members) */}
            {activeTab === "Members" && (
              <div className="flex items-center space-x-2">
                {(["All", "Approved", "Pending"] as const).map((f) => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      filter === f
                        ? "bg-black dark:bg-indigo-600 text-white"
                        : "bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-600"
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="overflow-auto flex-1 custom-scrollbar">
            {isLoading ? (
              <div className="p-12 flex justify-center text-gray-500 dark:text-gray-400">
                Loading data...
              </div>
            ) : activeTab === "Members" ? (
              <DashboardTable
                users={filteredUsers}
                handleApprove={handleApprove}
                handleDelete={handleDelete}
                handleRoleChange={handleRoleChange}
              />
            ) : (
              <PaymentsTable donations={filteredDonations} />
            )}
          </div>

          {!isLoading &&
            activeTab === "Members" &&
            filteredUsers.length === 0 && (
              <div className="p-8 text-center text-gray-500 dark:text-gray-400 flex-shrink-0">
                No users found matching your search.
              </div>
            )}

          {!isLoading &&
            activeTab === "Payments" &&
            filteredDonations.length === 0 && (
              <div className="p-8 text-center text-gray-500 dark:text-gray-400 flex-shrink-0">
                No payments found matching your search.
              </div>
            )}
        </div>
      </Container>
    </div>
  );
}
