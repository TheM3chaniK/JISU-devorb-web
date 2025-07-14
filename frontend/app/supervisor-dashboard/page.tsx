"use client";
import { useState, useEffect } from "react";
import DSCSubmissions from "../components/DSCSubmissions";
import AssignedScholarsTable from "./AsignedScholarTable";
import ScholarOverview from "./ScholarOverview";
import { Scholar } from "../types/Scholar";
import SubmissionsTab from "./SubmissionTab";

export default function SupervisorDashboard() {
  const [scholars, setScholars] = useState<Scholar[] | null>(null);
  const [mounted, setMounted] = useState(false);
  const [selectedScholar, setSelectedScholar] = useState<Scholar | null>(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({
    title: "",
    document: "",
    type: "",
    id: 0,
    action: "",
  });
  const [remark, setRemark] = useState("");

  useEffect(() => {
    setMounted(true);
    const fetchScholars = async () => {};
    fetchScholars();
  }, []);

  if (!mounted) return null;

  const handleScholarSelect = (scholar: Scholar) => {
    setSelectedScholar(scholar);
    setActiveTab("overview");
  };

  const handleBackToList = () => {
    setSelectedScholar(null);
  };

  const handleOpenModal = (
    title: string,
    document: string,
    type: string,
    id: number,
    action: string,
  ) => {
    setModalContent({ title, document, type, id, action });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setRemark("");
  };

  const handleAction = () => {
    // Here we would implement the actual approval/disapproval logic
    // For now, we just close the modal
    handleCloseModal();
  };

  const renderScholarTable = () => (
    <AssignedScholarsTable setSelectedScholar={setSelectedScholar} />
  );

  const renderScholarDetails = () => {
    if (!selectedScholar) return null;

    const renderTabs = () => (
      <div className="flex border-b mb-4">
        <button
          onClick={() => setActiveTab("overview")}
          className={`px-4 py-2 font-medium ${activeTab === "overview" ? "text-emerald-600 border-b-2 border-emerald-600" : "text-gray-500 hover:text-gray-700"}`}
        >
          Overview
        </button>
        <button
          onClick={() => setActiveTab("submissions")}
          className={`px-4 py-2 font-medium ${activeTab === "submissions" ? "text-emerald-600 border-b-2 border-emerald-600" : "text-gray-500 hover:text-gray-700"}`}
        >
          Submissions
        </button>
        <button
          onClick={() => setActiveTab("forms")}
          className={`px-4 py-2 font-medium ${activeTab === "forms" ? "text-emerald-600 border-b-2 border-emerald-600" : "text-gray-500 hover:text-gray-700"}`}
        >
          Forms
        </button>
      </div>
    );

    const renderOverview = () => (
      <ScholarOverview selectedScholar={selectedScholar} />
    );

    const renderSubmissions = () => (
      <SubmissionsTab selectedScholar={selectedScholar} />
    );
    const renderForms = () => (
      <div className="space-y-6">
        {/* Admission and Enrollment Documents */}
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <h4 className="text-md font-semibold text-gray-800 mb-3">
            Admission and Enrollment Documents
          </h4>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Title
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Submission Date
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {selectedScholar.forms
                  .filter((form) => form.category === "Enrollment")
                  .map((form) => (
                    <tr key={form.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="font-medium text-gray-900">
                          {form.title}
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            form.status === "Approved"
                              ? "bg-green-100 text-green-800"
                              : form.status === "Pending Review"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {form.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                        {form.submittedDate || "N/A"}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex space-x-2">
                          <button
                            className="text-blue-600 hover:text-blue-900"
                            onClick={() =>
                              handleOpenModal(
                                form.title,
                                form.document,
                                "form",
                                form.id,
                                "view",
                              )
                            }
                          >
                            View
                          </button>
                          {form.status === "Pending Review" && (
                            <>
                              <button
                                className="text-green-600 hover:text-green-900"
                                onClick={() =>
                                  handleOpenModal(
                                    form.title,
                                    form.document,
                                    "form",
                                    form.id,
                                    "approve",
                                  )
                                }
                              >
                                Approve
                              </button>
                              <button
                                className="text-red-600 hover:text-red-900"
                                onClick={() =>
                                  handleOpenModal(
                                    form.title,
                                    form.document,
                                    "form",
                                    form.id,
                                    "disapprove",
                                  )
                                }
                              >
                                Disapprove
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Supervisor and Committee Formation Documents */}
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <h4 className="text-md font-semibold text-gray-800 mb-3">
            Supervisor and Committee Formation Documents
          </h4>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Title
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Submission Date
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {selectedScholar.forms
                  .filter((form) => form.category === "Committee")
                  .map((form) => (
                    <tr key={form.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="font-medium text-gray-900">
                          {form.title}
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            form.status === "Approved"
                              ? "bg-green-100 text-green-800"
                              : form.status === "Pending Review"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {form.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                        {form.submittedDate || "N/A"}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex space-x-2">
                          <button
                            className="text-blue-600 hover:text-blue-900"
                            onClick={() =>
                              handleOpenModal(
                                form.title,
                                form.document,
                                "form",
                                form.id,
                                "view",
                              )
                            }
                          >
                            View
                          </button>
                          {form.status === "Pending Review" && (
                            <>
                              <button
                                className="text-green-600 hover:text-green-900"
                                onClick={() =>
                                  handleOpenModal(
                                    form.title,
                                    form.document,
                                    "form",
                                    form.id,
                                    "approve",
                                  )
                                }
                              >
                                Approve
                              </button>
                              <button
                                className="text-red-600 hover:text-red-900"
                                onClick={() =>
                                  handleOpenModal(
                                    form.title,
                                    form.document,
                                    "form",
                                    form.id,
                                    "disapprove",
                                  )
                                }
                              >
                                Disapprove
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Coursework and Registration Documents */}
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <h4 className="text-md font-semibold text-gray-800 mb-3">
            Coursework and Registration Documents
          </h4>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Title
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Submission Date
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {selectedScholar.forms
                  .filter((form) => form.category === "Coursework")
                  .map((form) => (
                    <tr key={form.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="font-medium text-gray-900">
                          {form.title}
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            form.status === "Approved"
                              ? "bg-green-100 text-green-800"
                              : form.status === "Pending Review"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {form.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                        {form.submittedDate || "N/A"}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex space-x-2">
                          <button
                            className="text-blue-600 hover:text-blue-900"
                            onClick={() =>
                              handleOpenModal(
                                form.title,
                                form.document,
                                "form",
                                form.id,
                                "view",
                              )
                            }
                          >
                            View
                          </button>
                          {form.status === "Pending Review" && (
                            <>
                              <button
                                className="text-green-600 hover:text-green-900"
                                onClick={() =>
                                  handleOpenModal(
                                    form.title,
                                    form.document,
                                    "form",
                                    form.id,
                                    "approve",
                                  )
                                }
                              >
                                Approve
                              </button>
                              <button
                                className="text-red-600 hover:text-red-900"
                                onClick={() =>
                                  handleOpenModal(
                                    form.title,
                                    form.document,
                                    "form",
                                    form.id,
                                    "disapprove",
                                  )
                                }
                              >
                                Disapprove
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );

    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <button
              onClick={handleBackToList}
              className="text-emerald-600 hover:text-emerald-900 mr-3"
            >
              ← Back to List
            </button>
            <h3 className="text-xl font-semibold text-gray-800">
              {selectedScholar.name}
            </h3>
          </div>
          <span
            className={`px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full ${
              selectedScholar.status.includes("Pending")
                ? "bg-yellow-100 text-yellow-800"
                : "bg-green-100 text-green-800"
            }`}
          >
            {selectedScholar.status}
          </span>
        </div>

        {renderTabs()}

        {activeTab === "overview" && renderOverview()}
        {activeTab === "submissions" && renderSubmissions()}
        {activeTab === "forms" && renderForms()}
      </div>
    );
  };

  // Render modal for actions
  const renderModal = () =>
    showModal && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl shadow-xl p-6 max-w-2xl w-full max-h-full overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800">
              {modalContent.action === "view"
                ? "View Document"
                : modalContent.action === "approve"
                  ? "Approve Document"
                  : "Disapprove Document"}
            </h3>
            <button
              onClick={handleCloseModal}
              className="text-gray-400 hover:text-gray-600"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="mb-4">
            <p className="font-medium text-gray-800">{modalContent.title}</p>
            <p className="text-sm text-gray-500">
              Document: {modalContent.document}
            </p>
          </div>

          {modalContent.action !== "view" && (
            <div className="mb-4">
              <label
                htmlFor="remark"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Add Remark
              </label>
              <textarea
                id="remark"
                value={remark}
                onChange={(e) => setRemark(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                rows={4}
                placeholder="Add your comments or feedback here..."
              ></textarea>
            </div>
          )}

          <div className="flex justify-end space-x-3">
            <button
              onClick={handleCloseModal}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            {modalContent.action !== "view" && (
              <button
                onClick={handleAction}
                className={`px-4 py-2 rounded-md text-white ${
                  modalContent.action === "approve"
                    ? "bg-emerald-600 hover:bg-emerald-700"
                    : "bg-red-600 hover:bg-red-700"
                }`}
              >
                {modalContent.action === "approve" ? "Approve" : "Disapprove"}
              </button>
            )}
          </div>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-emerald-600">
              Supervisor Dashboard
            </h1>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">Dr. Rajesh Gupta</span>
              <button className="bg-emerald-100 text-emerald-800 p-2 rounded-full">
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        {selectedScholar ? renderScholarDetails() : renderScholarTable()}
        <div className="mt-6">
          {scholars && <DSCSubmissions scholars={scholars} />}
        </div>
      </main>

      {/* Modal */}
      {renderModal()}
    </div>
  );
}
