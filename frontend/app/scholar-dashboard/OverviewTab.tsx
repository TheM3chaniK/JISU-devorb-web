"use client";

import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import StatusBadge from "../components/StatusBadge";

export interface AcademicProfile {
  id: number;
  enrollmentId: string;
  name: string;
  department: string;
  researchTopic: string;
  supervisor: string;
  coSupervisor?: string;
  dscMembers: string[];
}

interface Submission {
  id: number;
  title: string;
  category: string;
  date?: string;
  status: string;
}

interface OverviewTabProps {
  profileId: number;
}

const OverviewTab: React.FC<OverviewTabProps> = ({ profileId }) => {
  const [scholarData, setScholarData] = useState<AcademicProfile | null>(null);

  // Example static mock, replace with real fetch later if needed
  const submissionsData: Submission[] = [
    {
      id: 1,
      title: "Progress Report 1",
      category: "Progress Report",
      date: "2024-05-10",
      status: "Approved",
    },
    {
      id: 2,
      title: "Thesis Draft",
      category: "Thesis",
      date: "",
      status: "Pending",
    },
  ];

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(`/api/phd-scholar/profile/?id=${profileId}`);
        const data = await res.json();
        setScholarData(data);
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    };

    fetchProfile();
  }, [profileId]);

  if (!scholarData) {
    return (
      <div className="text-center text-black">
        Loading research information...
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Research Details */}
      <Card title="Research Information" className="md:col-span-2">
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium text-black">Department</h4>
            <p className="mt-1 text-black">{scholarData.department}</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-black">Research Topic</h4>
            <p className="mt-1 text-black">{scholarData.researchTopic}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium text-black">Supervisor</h4>
              <p className="mt-1 text-black">{scholarData.supervisor}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-black">Co-Supervisor</h4>
              <p className="mt-1 text-black">
                {scholarData.coSupervisor || "Not Assigned"}
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* DSC Members */}
      <Card title="DSC Members">
        <ul className="divide-y divide-gray-200">
          {scholarData.dscMembers.map((member, index) => (
            <li key={index} className="py-2 flex items-center">
              <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 mr-3">
                {member.split(" ")[0][0]}
              </div>
              <span className="text-black">{member}</span>
            </li>
          ))}
        </ul>
      </Card>

      {/* Recent Submissions */}
      <Card title="Recent Submissions" className="md:col-span-3">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                  Document Title
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                  Category
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                  Submission Date
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {submissionsData.map((submission) => (
                <tr key={submission.id}>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm font-medium text-black">
                      {submission.title}
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm text-black">
                      {submission.category}
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm text-black">
                      {submission.date || "Not Submitted"}
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <StatusBadge status={submission.status} />
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <button className="text-blue-600 hover:text-blue-800 text-sm">
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default OverviewTab;

