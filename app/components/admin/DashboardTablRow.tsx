"use client";
import React, { useState } from "react";
import DashboardTableActions from "./DashboardActions";
import { ReadUsersPostDashBoard } from "../buttons/Button";

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
    <tr className="hover:bg-gray-50 transition-colors">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="flex-shrink-0 h-10 w-10">
            {user.image ? (
              <img
                className="h-10 w-10 rounded-full object-cover"
                src={user.image}
                alt={user.name}
              />
            ) : (
              <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-bold">
                {user.name.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">
              <ReadUsersPostDashBoard id={user.userId} name={user.name} />
            </div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {user.roll_number}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <select
          aria-label="Select Role"
          title="Select Role"
          className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-black focus:border-black sm:text-sm rounded-md"
          value={selectedRole}
          onChange={handleRoleChangeSelect}
        >
          {chooseRole.map((role) => (
            <option key={role.id} value={role.value}>
              {role.label}
            </option>
          ))}
        </select>
      </td>

      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {user.email}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        {user.approved ? (
          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
            Approved
          </span>
        ) : (
          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
            Pending
          </span>
        )}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
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
