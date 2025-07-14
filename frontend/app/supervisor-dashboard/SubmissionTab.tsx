"use client";

import React from "react";
import { Scholar, ProgressReport, ResearchSubmission } from "@/app/types/Scholar"; 

interface SubmissionTabProps {
  selectedScholar: Scholar;
}

export default function SubmissionTab({ selectedScholar }: SubmissionTabProps) {
  // 🟢 Generic action handler — safe for all actions and doc types
  const handleAction = async (
    type: "progress" | "research" | "thesis",
    id: number | string,
    action: "approve" | "reject" | "view"
  ) => {
    try {
      let url = "";
      let method = "GET";

      if (action === "view") {
        if (type === "progress") {
          url = `/api/docs/progress-reports/${id}/view`;
        } else {
          // fallback for future e.g. thesis/research
          url = `/api/docs/${type}/${id}/view`;
        }
        // Open in new tab
        window.open(url, "_blank");
        return;
      }

      // For approve / reject
      method = "POST";
      if (type === "progress") {
        url = `/api/progress-reports/${id}/${action}`;
      } else {
        // When you add research/thesis later — same pattern:
        url = `/api/${type}/${id}/${action}`;
      }

      const res = await fetch(url, {
        method,
      });

      if (!res.ok) {
        throw new Error(`Failed to ${action} ${type} ${id}`);
      }

      alert(`${type} ${action} successful`);
      // ⏩ Optionally re-fetch data here for live updates

    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };

  return (
    <div className="space-y-6">
      {/* ✅ Research Proposal */}
      <section className="bg-white border border-gray-200 rounded-lg p-4">
        <h4 className="text-md font-semibold text-gray-800 mb-3">
          Research Proposal
        </h4>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Submission Date</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {selectedScholar.researchSubmissions.filter(r => r.id === "rp").map(sub => (
              <tr key={sub.id} className="hover:bg-gray-50">
                <td className="px-4 py-3">{sub.title}</td>
                <td className="px-4 py-3">{sub.status}</td>
                <td className="px-4 py-3">{sub.date || "N/A"}</td>
                <td className="px-4 py-3">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleAction("research", sub.id, "view")}
                      className="text-blue-600 hover:text-blue-900">View</button>

                    {sub.status === "Pending Review" && (
                      <>
                        <button
                          onClick={() => handleAction("research", sub.id, "approve")}
                          className="text-green-600 hover:text-green-900">Approve</button>

                        <button
                          onClick={() => handleAction("research", sub.id, "reject")}
                          className="text-red-600 hover:text-red-900">Reject</button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* ✅ Progress Reports */}
      <section className="bg-white border border-gray-200 rounded-lg p-4">
        <h4 className="text-md font-semibold text-gray-800 mb-3">
          Progress Reports
        </h4>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Submission Date</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {selectedScholar.progressReports.map(rp => (
              <tr key={rp.id} className="hover:bg-gray-50">
                <td className="px-4 py-3">{rp.title}</td>
                <td className="px-4 py-3">{rp.status}</td>
                <td className="px-4 py-3">{rp.date || "N/A"}</td>
                <td className="px-4 py-3">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleAction("progress", rp.id, "view")}
                      className="text-blue-600 hover:text-blue-900">View</button>

                    {rp.status === "Pending Review" && (
                      <>
                        <button
                          onClick={() => handleAction("progress", rp.id, "approve")}
                          className="text-green-600 hover:text-green-900">Approve</button>

                        <button
                          onClick={() => handleAction("progress", rp.id, "reject")}
                          className="text-red-600 hover:text-red-900">Reject</button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* ✅ Thesis — same pattern */}
      <section className="bg-white border border-gray-200 rounded-lg p-4">
        <h4 className="text-md font-semibold text-gray-800 mb-3">
          Pre-submission & Final Thesis
        </h4>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Submission Date</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {selectedScholar.researchSubmissions
              .filter(sub => sub.id === "pts" || sub.id === "fts")
              .map(sub => (
                <tr key={sub.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">{sub.title}</td>
                  <td className="px-4 py-3">{sub.status}</td>
                  <td className="px-4 py-3">{sub.date || "N/A"}</td>
                  <td className="px-4 py-3">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleAction("thesis", sub.id, "view")}
                        className="text-blue-600 hover:text-blue-900">View</button>

                      {sub.status === "Pending Review" && (
                        <>
                          <button
                            onClick={() => handleAction("thesis", sub.id, "approve")}
                            className="text-green-600 hover:text-green-900">Approve</button>

                          <button
                            onClick={() => handleAction("thesis", sub.id, "reject")}
                            className="text-red-600 hover:text-red-900">Reject</button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}

