import React from "react";
import { IoCheckmark, IoTrash } from "react-icons/io5";

interface DashboardTableActionsProps {
  userId: number;
  approved: boolean;
  handleApprove: (userId: number) => Promise<void>;
  handleDelete: (userId: number) => Promise<void>;
  selectedRole: string;
  handleRoleChange: (userId: number, role: string) => Promise<void>;
}

const DashboardTableActions: React.FC<DashboardTableActionsProps> = ({
  userId,
  approved,
  handleApprove,
  handleDelete,
  selectedRole,
  handleRoleChange,
}) => {
  const handleApproval = async () => {
    try {
      await handleApprove(userId);

      if (!approved) {
        await handleRoleChange(userId, selectedRole);
      }
    } catch (error) {
      console.error("Error approving user:", error);
    }
  };

  return (
    <div className="flex justify-center items-center space-x-3">
      {!approved && (
        <button
          onClick={handleApproval}
          className="text-green-600 hover:text-green-900 transition-colors p-1 rounded-full hover:bg-green-50"
          title="Approve User"
        >
          <IoCheckmark size={20} />
        </button>
      )}
      <button
        onClick={() => handleDelete(userId)}
        className="text-red-600 hover:text-red-900 transition-colors p-1 rounded-full hover:bg-red-50"
        title="Delete User"
      >
        <IoTrash size={20} />
      </button>
    </div>
  );
};

export default DashboardTableActions;
