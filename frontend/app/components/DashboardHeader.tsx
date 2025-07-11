import React from "react";
interface DashboardHeaderProps {
  name: string;
  enrollmentId: string;
}
const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  name,
  enrollmentId,
}) => (
  <div className="bg-white border-b border-gray-200 px-4 py-5 sm:px-6 mb-6 rounded-lg shadow-sm">
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
      <div>
        <h2 className="text-2xl font-bold text-black">{name}</h2>
        <p className="text-sm text-black">Enrollment ID: {enrollmentId}</p>
      </div>
      <div className="flex space-x-3 mt-4 sm:mt-0">
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm">
          Edit Profile
        </button>
        <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition text-sm">
          Logout
        </button>
      </div>
    </div>
  </div>
);

export default DashboardHeader;
