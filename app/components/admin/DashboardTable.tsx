import React from 'react';
import DashboardTableRow from './DashboardTablRow';

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
  userId:string;
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
    <table className="min-w-full bg-white border border-gray-300">
      <thead>
        <tr className="bg-gray-600 text-white">
          <th className="py-2 px-4 border-b">Name</th>
          <th className="py-2 px-4 border-b">Roll Number</th>
          <th className="py-2 px-4 border-b">Role</th>
          <th className="py-2 px-4 border-b">Email</th>
          <th className="py-2 px-4 border-b">Status</th>
          <th className="py-2 px-4 border-b">Actions</th>
        </tr>
      </thead>
      <tbody>
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
