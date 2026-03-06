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
    <table className="min-w-full divide-y divide-gray-200 dark:divide-slate-700 relative">
      <thead className="bg-gray-50 dark:bg-slate-800 sticky top-0 z-10 shadow-sm">
        <tr>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider backdrop-blur-sm bg-gray-50/95 dark:bg-slate-800/95"
          >
            User
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider backdrop-blur-sm bg-gray-50/95 dark:bg-slate-800/95"
          >
            Roll Number
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider backdrop-blur-sm bg-gray-50/95 dark:bg-slate-800/95"
          >
            Role
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider backdrop-blur-sm bg-gray-50/95 dark:bg-slate-800/95"
          >
            Email
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider backdrop-blur-sm bg-gray-50/95 dark:bg-slate-800/95"
          >
            Status
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-center text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider backdrop-blur-sm bg-gray-50/95 dark:bg-slate-800/95"
          >
            Actions
          </th>
        </tr>
      </thead>
      <tbody className="bg-white dark:bg-slate-800 divide-y divide-gray-200 dark:divide-slate-700">
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
