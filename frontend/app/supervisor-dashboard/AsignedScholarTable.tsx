"use client";

import React, { useEffect, useState } from "react";
import { Scholar } from "../types/Scholar";

interface AssignedScholarsTableProp {
  setSelectedScholar: React.Dispatch<React.SetStateAction<Scholar | null>>;
}

const AssignedScholarsTable: React.FC<AssignedScholarsTableProp> = ({
  setSelectedScholar,
}) => {

  const [assignedscholars, setAssignedScholars] = useState<Scholar[]>(
    [],
  );

  useEffect(() => {
    const fetchScholars = async () => {
      try {
        const res = await fetch("/api/supervisor/assigned-scholars");
        if (!res.ok) throw new Error(`HTTP error ${res.status}`);
        const data = await res.json();
        console.log("API response:", data);

        setAssignedScholars(data.assignedScholars);
      } catch (err) {
        console.error("Error fetching scholars:", err);
      }
    };

    fetchScholars();
  }, []);

  const handleScholarSelect = (scholar: Scholar) => {
    setSelectedScholar(scholar);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">
        Assigned Ph.D. Scholars
      </h3>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Department
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Enrollment No.
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {assignedscholars.map((scholar) => (
              <tr key={scholar.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="font-medium text-gray-900">
                    {scholar.name}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {scholar.department}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {scholar.enrollmentId}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      scholar.status.includes("Pending")
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {scholar.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button
                    onClick={() => handleScholarSelect(scholar)}
                    className="text-emerald-600 hover:text-emerald-900 font-medium"
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}

            {assignedscholars.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="text-center text-gray-500 py-4 text-sm"
                >
                  No scholars assigned.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AssignedScholarsTable;
