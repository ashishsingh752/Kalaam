import React from 'react';

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
      console.error('Error approving user:', error);
    }
  };

  return (
    <div className="flex justify-center space-x-2">
      {!approved && (
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleApproval}
        >
          Approve
        </button>
      )}
      <button
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => handleDelete(userId)}
      >
        Delete
      </button>
    </div>
  );
};

export default DashboardTableActions;
