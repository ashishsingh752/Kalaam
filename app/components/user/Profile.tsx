"use client";
import { HandleDeleteAccount } from "@/app/components/buttons/Button";
import ProfileImageUpload from "@/app/components/user/ProfileImageUpload";
import UsersPostWrapper from "@/app/components/user/UsersPost";
import axios from "axios";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface User {
  name?: string;
  email?: string;
  roll_number?: string;
  image?: string;
  role?: string;
  mobile_number?: string;
  yearOfStudy?: string;
}

//! user profile component. - Status:200
export default function Profile() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [userName, setUserName] = useState<string>("");
  const [userEmail, setUserEmail] = useState<string>("");
  const [userRollNumber, setUserRollNumber] = useState<string>("");
  const [userRole, setUserRole] = useState<string>("");
  const [userContact, setUserContact] = useState<string>("");
  const [userYearOfStudy, setUserYearOfStudy] = useState<string>("");
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const signOutUser = async () => {
    await signOut();
  };

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/signin");
    } else if (status === "authenticated" && session?.user) {
      const user = session.user as User;
      setUserName(user.name || "");
      setUserEmail(user.email || "");
      setUserRollNumber(user.roll_number || "");
      setUserRole(user.role || "");
      setUserContact(user.mobile_number || "");
      setUserYearOfStudy(
        user.yearOfStudy || calculateYearOfStudy(user.roll_number || "")
      );
    }
  }, [status, router, session]);

  const calculateYearOfStudy = (rollNumber: string) => {
    if (!rollNumber) return "";

    // Extract year from roll number (e.g., 121CS... -> 21 -> 2021)
    // Matches 3 digits, 2 letters, 4 digits pattern commonly used
    const match = rollNumber.match(/^(\d{3})[A-Z]{2}\d{4}$/);
    if (!match) return "";

    const batchYearPrefix = match[1].substring(1); // '21' from '121'
    const batchYear = parseInt("20" + batchYearPrefix);
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth(); // 0-11

    // If current month is before July (approx start of academic year), subtract 1 from year diff
    // Example: Batch 2021. Feb 2022. Diff 1 catch. But they are in 1st year (2021-22).
    // 2022 - 2021 = 1.
    // If month >= 6 (July), then they have started next year.
    // July 2022 -> 2022 - 2021 = 1. +1 = 2nd Year?
    // Let's stick to simple "Current Year - Batch Year + (Month >= 6 ? 1 : 0)" methodology?
    // Batch 2021.
    // Aug 2021 (Month 7): 2021 - 2021 + 1 = 1st Year.
    // Jan 2022 (Month 0): 2022 - 2021 + 0 = 1st Year.
    // Aug 2022 (Month 7): 2022 - 2021 + 1 = 2nd Year.

    let yearDiff = currentYear - batchYear;
    if (currentMonth >= 6) {
      // July onwards
      yearDiff += 1;
    }

    if (yearDiff > 5) return "5"; // Alumni
    if (yearDiff < 1) return "1"; // Just joined
    return yearDiff.toString();
  };

  if (status === "loading") {
    return (
      <div className="flex h-screen items-center justify-center">
        <Image
          className="h-40 w-40"
          src={`https://media.tenor.com/_62bXB8gnzoAAAAj/loading.gif`}
          width={40}
          height={40}
          alt="Loading..."
        />
      </div>
    );
  }

  const handleImageUpload = (file: File) => {
    setProfileImage(file);
  };

  const handleUpdate = async () => {
    const formData = new FormData();
    formData.append("name", userName);
    formData.append("email", userEmail);
    formData.append("roll_number", userRollNumber);
    formData.append("role", userRole);
    formData.append("mobile_number", userContact);
    formData.append("yearOfStudy", userYearOfStudy);
    if (profileImage) {
      formData.append("image", profileImage);
    }

    try {
      setLoading(true);
      const res = await axios.post("/api/user/profile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.status === 200) {
        setLoading(false);
        alert(
          "User updated successfully!. Please sign in again to see the changes."
        );
        await signOutUser();
      } else {
        alert("Failed to update user");
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
      alert(`An error occurred while updating the user: ${error}`);
    }
  };

  console.log(session?.user);

  return (
    <div className="flex justify-center items-center bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full space-y-8">
        <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
          <div className="md:flex">
            {/* Left Side - Profile Image & Basic Info */}
            <div className="md:w-1/3 bg-blue-50 p-8 flex flex-col items-center justify-center border-r border-blue-100">
              <div className="mb-6">
                <ProfileImageUpload
                  imageUrl={
                    session?.user?.image ||
                    "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI="
                  }
                  onUpload={handleImageUpload}
                />
              </div>
              <h2 className="text-xl font-bold text-gray-800 text-center">
                {userName || "User Name"}
              </h2>
              <p className="text-sm text-gray-500 text-center mt-1">
                {userRole || "Role"}
              </p>
            </div>

            {/* Right Side - Form Details */}
            <div className="md:w-2/3 p-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-800">
                  Profile Settings
                </h3>
              </div>

              <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700">
                    Full Name
                  </label>
                  <input
                    onChange={(e) => setUserName(e.target.value)}
                    value={userName}
                    placeholder="Your name"
                    className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out sm:text-sm"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700">
                    Email Address
                  </label>
                  <input
                    onChange={(e) => setUserEmail(e.target.value)}
                    value={userEmail}
                    placeholder="Your email"
                    className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out sm:text-sm"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700">
                    Roll Number
                  </label>
                  <input
                    onChange={(e) => setUserRollNumber(e.target.value)}
                    value={userRollNumber}
                    placeholder="Roll Number"
                    className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out sm:text-sm"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700">
                    Contact Number
                  </label>
                  <div className="relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">+91</span>
                    </div>
                    <input
                      onChange={(e) => setUserContact(e.target.value)}
                      value={userContact}
                      placeholder="8888888888"
                      className="block w-full pl-10 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out sm:text-sm"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2 space-y-1">
                  <label className="text-sm font-medium text-gray-700">
                    Year of Study
                  </label>
                  <select
                    value={userYearOfStudy}
                    id="yearOfStudy"
                    aria-label="Year of Study"
                    onChange={(e) => setUserYearOfStudy(e.target.value)}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out sm:text-sm bg-white"
                  >
                    <option value="">Select Year of Study</option>
                    <option value="1">First Year</option>
                    <option value="2">Second Year</option>
                    <option value="3">Third Year</option>
                    <option value="4">Fourth Year</option>
                    <option value="5">Alumni</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-between pt-6 mt-6 border-t border-gray-100">
                <HandleDeleteAccount />
                <button
                  onClick={handleUpdate}
                  disabled={loading}
                  className="inline-flex justify-center py-2 px-6 border border-transparent shadow-sm text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition duration-150 ease-in-out"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <svg
                        className="animate-spin -ml-1 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Updating...
                    </span>
                  ) : (
                    "Save Changes"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Posts Section */}
        <div className="bg-white shadow-lg rounded-2xl overflow-hidden p-8">
          <div className="mb-6 flex items-center justify-between border-b pb-4 border-gray-100">
            <h3 className="text-xl font-bold text-gray-800">Your Posts</h3>
            <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
              Manage Content
            </span>
          </div>
          <UsersPostWrapper />
        </div>
      </div>
    </div>
  );
}
