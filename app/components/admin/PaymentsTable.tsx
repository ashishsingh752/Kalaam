import React from "react";
import { format } from "date-fns";

export interface DonationProps {
  id: number;
  razorpayOrderId: string;
  razorpayPaymentId: string;
  amount: number;
  tier: string;
  createdAt: string;
  user?: {
    name: string;
    email: string;
    roll_number: string;
  } | null;
}

interface PaymentsTableProps {
  donations: Array<DonationProps>;
}

const PaymentsTable: React.FC<PaymentsTableProps> = ({ donations }) => {
  return (
    <table className="min-w-full divide-y divide-gray-200 dark:divide-slate-700 relative">
      <thead className="bg-gray-50 dark:bg-slate-800 sticky top-0 z-10 shadow-sm">
        <tr>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider backdrop-blur-sm bg-gray-50/95 dark:bg-slate-800/95"
          >
            Date
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider backdrop-blur-sm bg-gray-50/95 dark:bg-slate-800/95"
          >
            Donor Info
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider backdrop-blur-sm bg-gray-50/95 dark:bg-slate-800/95"
          >
            Amount
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider backdrop-blur-sm bg-gray-50/95 dark:bg-slate-800/95"
          >
            Tier
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider backdrop-blur-sm bg-gray-50/95 dark:bg-slate-800/95"
          >
            Reference IDs
          </th>
        </tr>
      </thead>
      <tbody className="bg-white dark:bg-slate-800 divide-y divide-gray-200 dark:divide-slate-700">
        {donations.map((donation) => (
          <tr
            key={donation.id}
            className="hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors"
          >
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
              {format(new Date(donation.createdAt), "MMM d, yyyy h:mm a")}
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              {donation.user ? (
                <div>
                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                    {donation.user.name}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {donation.user.email}
                  </div>
                </div>
              ) : (
                <div className="text-sm italic text-gray-500 dark:text-gray-400">
                  Anonymous Donor
                </div>
              )}
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                ₹{donation.amount}
              </span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
              {donation.tier}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
              <div className="flex flex-col gap-1 text-xs">
                <span title="Order ID" className="truncate w-32 font-mono">
                  {donation.razorpayOrderId}
                </span>
                <span
                  title="Payment ID"
                  className="truncate w-32 font-mono text-gray-400 dark:text-gray-500"
                >
                  {donation.razorpayPaymentId}
                </span>
              </div>
            </td>
          </tr>
        ))}
        {donations.length === 0 && (
          <tr>
            <td
              colSpan={5}
              className="px-6 py-12 text-center text-sm text-gray-500 dark:text-gray-400"
            >
              No payments found yet.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default PaymentsTable;
