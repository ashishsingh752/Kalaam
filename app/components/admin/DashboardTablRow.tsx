"use client";
import React, { useState } from "react";
import DashboardTableActions from "./DashboardActions";
import ReadUsersPost from "../post/ReadUsersPost";
import { ReadUsersPostButton, ReadUsersPostDashBoard } from "../buttons/Button";

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
  userId: string;
  mobile_number: string;
}

interface UserRowProps {
  user: MembersOfClubProps;
  handleApprove: (userId: number) => Promise<void>;
  handleDelete: (userId: number) => Promise<void>;
  handleRoleChange: (userId: number, role: string) => Promise<void>;
}

const chooseRole = [
  { id: 1, value: "Admin", label: "Admin" },
  { id: 2, value: "User", label: "User" },
  { id: 3, value: "President", label: "President" },
  { id: 4, value: "Vice President", label: "Vice President" },
  { id: 5, value: "Secretary", label: "Secretary" },
  { id: 6, value: "Treasurer", label: "Treasurer" },
  { id: 7, value: "Member", label: "Member" },
  { id: 8, value: "Alumni", label: "Alumni" },
  { id: 9, value: "Faculty", label: "Faculty" },
  { id: 10, value: "Staff", label: "Staff" },
];

const DashboardTableRow: React.FC<UserRowProps> = ({
  user,
  handleApprove,
  handleDelete,
  handleRoleChange,
}) => {
  const [selectedRole, setSelectedRole] = useState(user.role);

  const handleRoleChangeSelect = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedRole(event.target.value);
    handleRoleChange(user.id, event.target.value);
  };

  return (
    <tr className="text-center">
      <td className="py-2 px-4  border-b">
        <ReadUsersPostDashBoard id={user.userId} name={user.name} />
      </td>
      <td className="py-2 px-4 border-b">{user.roll_number}</td>
      <td className="py-2 px-4 border-b">
        <div className="flex items-center justify-center">
          <select
            className="border w-36 border-gray-300 bg-white rounded-md  py-1 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-300 focus:border-blue-500 transition-colors duration-200 ease-in-out"
            value={selectedRole}
            onChange={handleRoleChangeSelect}
          >
            {chooseRole.map((role) => (
              <option key={role.id} value={role.value}>
                {role.label}
              </option>
            ))}
          </select>
        </div>
      </td>

      <td className="py-2 px-4 border-b">{user.email}</td>
      <td className="py-2 px-4 border-b">
        {user.approved ? (
          <span className="text-green-500 font-semibold">Approved</span>
        ) : (
          <span className="text-red-500 font-semibold">Pending</span>
        )}
      </td>
      <td className="py-2 px-4 border-b">
        <DashboardTableActions
          userId={user.id}
          approved={user.approved}
          handleApprove={handleApprove}
          handleDelete={handleDelete}
          selectedRole={selectedRole}
          handleRoleChange={handleRoleChange}
        />
      </td>
    </tr>
  );
};

export default DashboardTableRow;
