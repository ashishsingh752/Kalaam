"use client";

interface DashboardTableActionsProps {
  userId: number;
  approved: boolean;
  handleApprove: (userId: number) => Promise<void>;
  handleDelete: (userId: number) => Promise<void>;
}

const DashboardTableActions: React.FC<DashboardTableActionsProps> = ({
  userId,
  approved,
  handleApprove,
  handleDelete,
}) => {
  return (
    <div>
      {!approved && (
        <button
          onClick={() => handleApprove(userId)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
        >
          Approve
        </button>
      )}
      <button
        onClick={() => handleDelete(userId)}
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
      >
        Delete
      </button>
    </div>
  );
};

export default DashboardTableActions;
