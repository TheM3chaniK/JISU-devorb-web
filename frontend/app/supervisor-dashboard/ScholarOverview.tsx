import React from "react";
import { Scholar } from "../types/Scholar";

interface ScholarOverviewProps {
  selectedScholar: Scholar;
}

const ScholarOverview: React.FC<ScholarOverviewProps> = ({
  selectedScholar,
}) => {
  return (
    <div className="space-y-6">
      {/* Scholar Info */}
      <div className="bg-emerald-50 border border-emerald-100 rounded-lg p-4">
        <h4 className="text-lg font-semibold text-gray-800 mb-3">
          Scholar Information
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Name</p>
            <p className="font-medium text-black">{selectedScholar.name}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Department</p>
            <p className="font-medium text-black">
              {selectedScholar.department}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Enrollment Number</p>
            <p className="font-medium text-black">
              {selectedScholar.enrollmentId}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Current Status</p>
            <p className="font-medium text-black">{selectedScholar.status}</p>
          </div>
          <div className="md:col-span-2">
            <p className="text-sm text-gray-500">Research Topic</p>
            <p className="font-medium text-black">
              {selectedScholar.researchTopic}
            </p>
          </div>
        </div>
      </div>

      {/* Supervisor Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <h4 className="text-md font-semibold text-gray-800 mb-3">
            Supervisor Information
          </h4>
          <div>
            <p className="text-sm text-gray-500">Name</p>
            <p className="font-medium text-black">
              {selectedScholar.supervisor.name}
            </p>
          </div>
          <div className="mt-2">
            <p className="text-sm text-gray-500">Email</p>
            <p className="font-medium text-black">
              {selectedScholar.supervisor.email}
            </p>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <h4 className="text-md font-semibold text-gray-800 mb-3">
            Co-Supervisor Information
          </h4>
          <div>
            <p className="text-sm text-gray-500">Name</p>
            <p className="font-medium text-black">
              {selectedScholar.coSupervisor.name}
            </p>
          </div>
          <div className="mt-2">
            <p className="text-sm text-gray-500">Email</p>
            <p className="font-medium text-black">
              {selectedScholar.coSupervisor.email}
            </p>
          </div>
        </div>
      </div>

      {/* DSC Members */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <h4 className="text-md font-semibold text-gray-800 mb-3">
          Doctoral Scrutiny Committee (DSC)
        </h4>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Designation
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Department
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {selectedScholar.dscMembers.map((member) => (
                <tr key={member.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="font-medium text-gray-900">
                      {member.name}
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                    {member.designation}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                    {member.department}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                    {member.email}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ScholarOverview;
