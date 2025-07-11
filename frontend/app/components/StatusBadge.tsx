import React from "react";
interface StatusBadgeProps {
  status: string;
}
const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  let bgColor = "bg-gray-200 text-gray-800";

  if (status.toLowerCase().includes("approved")) {
    bgColor = "bg-green-100 text-green-800";
  } else if (status.toLowerCase().includes("pending")) {
    bgColor = "bg-amber-100 text-amber-800";
  } else if (status.toLowerCase().includes("not started")) {
    bgColor = "bg-gray-100 text-gray-800";
  } else if (
    status.toLowerCase().includes("rejected") ||
    status.toLowerCase().includes("due")
  ) {
    bgColor = "bg-red-100 text-red-800";
  }

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${bgColor}`}>
      {status}
    </span>
  );
};

export default StatusBadge;
