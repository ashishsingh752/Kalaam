import React from "react";
import DashboardTableRow from "./DashboardTablRow";

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

interface DashboardTableProps {
  users: Array<MembersOfClubProps>;
  handleApprove: (userId: number) => Promise<void>;
  handleDelete: (userId: number) => Promise<void>;
  handleRoleChange: (userId: number, role: string) => Promise<void>;
}

const DashboardTable: React.FC<DashboardTableProps> = ({
  users,
  handleApprove,
  handleDelete,
  handleRoleChange,
}) => {
  return (
    <table className="min-w-full divide-y divide-gray-200 relative">
      <thead className="bg-gray-50 sticky top-0 z-10 shadow-sm">
        <tr>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider backdrop-blur-sm bg-gray-50/95"
          >
            User
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider backdrop-blur-sm bg-gray-50/95"
          >
            Roll Number
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider backdrop-blur-sm bg-gray-50/95"
          >
            Role
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider backdrop-blur-sm bg-gray-50/95"
          >
            Email
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider backdrop-blur-sm bg-gray-50/95"
          >
            Status
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider backdrop-blur-sm bg-gray-50/95"
          >
            Actions
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {users.map((user) => (
          <DashboardTableRow
            key={user.id}
            user={user}
            handleApprove={handleApprove}
            handleDelete={handleDelete}
            handleRoleChange={handleRoleChange}
          />
        ))}
      </tbody>
    </table>
  );
};

export default DashboardTable;
