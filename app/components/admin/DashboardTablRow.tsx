"use client";
import DashboardTableActions from "./DashboardActions";

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

interface UserRowProps {
  user: MembersOfClubProps;
  handleApprove: (userId: number) => Promise<void>;
  handleDelete: (userId: number) => Promise<void>;
}

const DashboardTableRow: React.FC<UserRowProps> = ({
  user,
  handleApprove,
  handleDelete,
}) => {
  return (
    <tr className="text-center">
      <td className="py-2 px-4 border-b">{user.name}</td>
      <td className="py-2 px-4 border-b">{user.roll_number}</td>
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
        />
      </td>
    </tr>
  );
};

export default DashboardTableRow;
