"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Card from "../components/Card";
import ProgressReports from "./ProgressReports";

// Define TypeScript interfaces for our data structure
interface ProgressReport {
  id: number;
  status: string;
  date: string | null;
}

interface ProgressStatus {
  status: string;
  date: string | null;
  details?: string | null;
}

interface Fee {
  id: number;
  name: string;
  amount: number;
  status: string;
  receipt: string | null;
  date: string | null;
}

interface Notification {
  id: number;
  message: string;
  date: string;
  read: boolean;
}

interface ScholarProgress {
  applicationApproved: boolean;
  supervisorAssigned: boolean;
  dscFormed: boolean;
  researchProposalApproved: boolean;
  courseWorkCompleted: boolean;
  progressReports: ProgressReport[];
  preSubmission: ProgressStatus;
  thesisSubmission: ProgressStatus;
  vivaVoce: ProgressStatus;
}

interface ScholarData {
  name: string;
  enrollmentId: string;
  department: string;
  researchTopic: string;
  supervisor: string;
  coSupervisor: string;
  dscMembers: string[];
  progress: ScholarProgress;
  fees: Fee[];
  notifications: Notification[];
}

interface Submission {
  id: number;
  title: string;
  category: string;
  status: string;
  date: string | null;
}

// Mock data - this would come from your API in a real application
const scholarData: ScholarData = {
  name: "Jane Doe",
  enrollmentId: "PhD-2025-001",
  department: "Computer Science",
  researchTopic: "Advanced AI Applications in Healthcare Systems",
  supervisor: "Dr. John Smith",
  coSupervisor: "Dr. Sarah Johnson",
  dscMembers: ["Prof. Robert Wilson", "Dr. Emily Chen", "Dr. Michael Brown"],
  progress: {
    applicationApproved: true,
    supervisorAssigned: true,
    dscFormed: true,
    researchProposalApproved: true,
    courseWorkCompleted: true,
    progressReports: [
      { id: 1, status: "Approved", date: "10/05/2024" },
      { id: 2, status: "Approved", date: "12/11/2024" },
      { id: 3, status: "Pending Supervisor Approval", date: "05/02/2025" },
      { id: 4, status: "Not Started", date: null },
      { id: 5, status: "Not Started", date: null },
      { id: 6, status: "Not Started", date: null },
    ],
    preSubmission: { status: "Not Started", date: null },
    thesisSubmission: { status: "Not Started", date: null },
    vivaVoce: { status: "Not Started", date: null, details: null },
  },
  fees: [
    {
      id: 1,
      name: "Registration Fee",
      amount: 5000,
      status: "Paid",
      receipt: "REC-001",
      date: "05/01/2024",
    },
    {
      id: 2,
      name: "Semester Fee (1st)",
      amount: 10000,
      status: "Paid",
      receipt: "REC-002",
      date: "10/01/2024",
    },
    {
      id: 3,
      name: "Semester Fee (2nd)",
      amount: 10000,
      status: "Due",
      receipt: null,
      date: null,
    },
  ],
  notifications: [
    {
      id: 1,
      message: "Progress Report 3 requires your attention",
      date: "04/30/2025",
      read: false,
    },
    {
      id: 2,
      message: "Supervisor has commented on your latest submission",
      date: "04/28/2025",
      read: true,
    },
    {
      id: 3,
      message: "Semester fee payment reminder",
      date: "04/20/2025",
      read: true,
    },
  ],
};

// Mock submissions data for overview
const submissionsData: Submission[] = [
  {
    id: 1,
    title: "Research Proposal",
    category: "Research Documents",
    status: "Approved",
    date: "15/01/2024",
  },
  {
    id: 2,
    title: "Course Work Results",
    category: "Course Work",
    status: "Approved",
    date: "10/02/2024",
  },
  {
    id: 3,
    title: "DSC Formation Request",
    category: "Committee Formation",
    status: "Approved",
    date: "25/01/2024",
  },
  {
    id: 4,
    title: "Ph.D. Registration Form",
    category: "Admission Documents",
    status: "Approved",
    date: "05/01/2024",
  },
  {
    id: 5,
    title: "Progress Report 1",
    category: "Progress Reports",
    status: "Approved",
    date: "10/05/2024",
  },
  {
    id: 6,
    title: "Progress Report 2",
    category: "Progress Reports",
    status: "Approved",
    date: "12/11/2024",
  },
  {
    id: 7,
    title: "Progress Report 3",
    category: "Progress Reports",
    status: "Pending",
    date: "05/02/2025",
  },
];

// Component for displaying status with appropriate color
const StatusBadge = ({ status }: { status: string }) => {
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

// Dashboard header component
const DashboardHeader = ({
  name,
  enrollmentId,
}: {
  name: string;
  enrollmentId: string;
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

export default function ScholarDashboard() {
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    setMounted(true);
  }, []);

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Header - This would be your common header */}
      <header className="bg-blue-600 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-xl font-bold white">Ph.D. Scholar Dashboard</h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <button className="text-white hover:text-gray-700">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
                {scholarData.notifications.filter((n) => !n.read).length >
                  0 && (
                  <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500"></span>
                )}
              </button>
            </div>
            <div className="h-8 w-8 rounded-full bg-white text-blue-600 flex items-center justify-center">
              {scholarData.name.charAt(0)}
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Scholar Dashboard Header */}
        <DashboardHeader
          name={scholarData.name}
          enrollmentId={scholarData.enrollmentId}
        />

        {/* Tab Navigation */}
        <div className="mb-6 bg-white rounded-lg shadow-sm overflow-x-auto">
          <div className="border-b border-gray-200 min-w-max">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab("overview")}
                className={`py-4 px-6 font-medium text-sm ${
                  activeTab === "overview"
                    ? "border-b-2 border-blue-500 text-blue-600"
                    : "text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab("submissions")}
                className={`py-4 px-6 font-medium text-sm ${
                  activeTab === "submissions"
                    ? "border-b-2 border-blue-500 text-blue-600"
                    : "text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Submissions
              </button>
              <button
                onClick={() => setActiveTab("forms")}
                className={`py-4 px-6 font-medium text-sm ${
                  activeTab === "forms"
                    ? "border-b-2 border-blue-500 text-blue-600"
                    : "text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Forms
              </button>
              <button
                onClick={() => setActiveTab("fees")}
                className={`py-4 px-6 font-medium text-sm ${
                  activeTab === "fees"
                    ? "border-b-2 border-blue-500 text-blue-600"
                    : "text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Fees & Accounts
              </button>
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial="hidden"
          animate="show"
          variants={fadeIn}
        >
          {/* Overview Tab */}
          {activeTab === "overview" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Research Details */}
              <Card title="Research Information" className="md:col-span-2">
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-black">
                      Department
                    </h4>
                    <p className="mt-1 text-black">{scholarData.department}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-black">
                      Research Topic
                    </h4>
                    <p className="mt-1 text-black">
                      {scholarData.researchTopic}
                    </p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-medium text-black">
                        Supervisor
                      </h4>
                      <p className="mt-1 text-black">
                        {scholarData.supervisor}
                      </p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-black">
                        Co-Supervisor
                      </h4>
                      <p className="mt-1 text-black">
                        {scholarData.coSupervisor || "Not Assigned"}
                      </p>
                    </div>
                  </div>
                </div>
              </Card>

              {/* DSC Members */}
              <Card title="DSC Members" className="">
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
                        <th
                          scope="col"
                          className="px-4 py-3 text-left text-xs font-medium text-black uppercase tracking-wider"
                        >
                          Document Title
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3 text-left text-xs font-medium text-black uppercase tracking-wider"
                        >
                          Category
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3 text-left text-xs font-medium text-black uppercase tracking-wider"
                        >
                          Submission Date
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3 text-left text-xs font-medium text-black uppercase tracking-wider"
                        >
                          Status
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3 text-left text-xs font-medium text-black uppercase tracking-wider"
                        >
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
          )}

          {/* Submissions Tab */}
          {activeTab === "submissions" && (
            <div className="space-y-6">
              {/* Research Proposal */}
              <Card title="Research Proposal" className="">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-black">
                      Research Proposal Document
                    </h4>
                    <p className="text-xs text-black mt-1">
                      Uploaded on January 15, 2024
                    </p>
                  </div>
                  <div className="flex items-center space-x-3 mt-2 sm:mt-0">
                    <StatusBadge status="Approved" />
                    <button className="text-blue-600 hover:text-blue-800 text-sm">
                      View
                    </button>
                  </div>
                </div>
              </Card>

              {/* Progress Reports */}
              <ProgressReports />
              {/* Pre-Submission */}
              <Card title="Pre-Thesis Submission" className="">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-black">
                      Pre-Thesis Submission
                    </h4>
                    <p className="text-xs text-black mt-1">Not yet submitted</p>
                  </div>
                  <div className="flex items-center space-x-3 mt-2 sm:mt-0">
                    <StatusBadge status="Not Started" />
                    <button
                      className="bg-gray-200 text-gray-600 text-xs font-medium py-1 px-3 rounded hover:bg-gray-300 transition"
                      disabled
                    >
                      Upload
                    </button>
                  </div>
                </div>
              </Card>

              {/* Final Thesis */}
              <Card title="Final Thesis Submission" className="">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-black">
                      Final Thesis
                    </h4>
                    <p className="text-xs text-black mt-1">Not yet submitted</p>
                  </div>
                  <div className="flex items-center space-x-3 mt-2 sm:mt-0">
                    <StatusBadge status="Not Started" />
                    <button
                      className="bg-gray-200 text-gray-600 text-xs font-medium py-1 px-3 rounded hover:bg-gray-300 transition"
                      disabled
                    >
                      Upload
                    </button>
                  </div>
                </div>
              </Card>
            </div>
          )}

          {/* Forms Tab */}
          {activeTab === "forms" && (
            <div className="space-y-6">
              {/* Admission and Enrollment Forms */}
              <Card title="Admission and Enrollment Documents">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border rounded-lg p-4 hover:bg-blue-50 transition cursor-pointer">
                    <h4 className="text-sm font-medium text-black">
                      Application Forms
                    </h4>
                    <p className="text-xs text-black mt-1">
                      Initial application and enrollment documents
                    </p>
                    <div className="flex justify-end mt-2">
                      <svg
                        className="w-6 h-6 text-blue-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="border rounded-lg p-4 hover:bg-blue-50 transition cursor-pointer">
                    <h4 className="text-sm font-medium text-black">
                      Identity Documents
                    </h4>
                    <p className="text-xs text-black mt-1">
                      Personal identification and verification forms
                    </p>
                    <div className="flex justify-end mt-2">
                      <svg
                        className="w-6 h-6 text-blue-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="border rounded-lg p-4 hover:bg-blue-50 transition cursor-pointer">
                    <h4 className="text-sm font-medium text-black">
                      Academic Documents
                    </h4>
                    <p className="text-xs text-black mt-1">
                      Previous education certificates and transcripts
                    </p>
                    <div className="flex justify-end mt-2">
                      <svg
                        className="w-6 h-6 text-blue-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="border rounded-lg p-4 hover:bg-blue-50 transition cursor-pointer">
                    <h4 className="text-sm font-medium text-black">
                      Declaration Forms
                    </h4>
                    <p className="text-xs text-black mt-1">
                      Required declarations and undertakings
                    </p>
                    <div className="flex justify-end mt-2">
                      <svg
                        className="w-6 h-6 text-blue-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Supervisor and Committee Formation */}
              <Card title="Supervisor and Committee Formation Documents">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border rounded-lg p-4 hover:bg-blue-50 transition cursor-pointer">
                    <h4 className="text-sm font-medium text-black">
                      Supervisor Assignment
                    </h4>
                    <p className="text-xs text-black mt-1">
                      Forms for supervisor nomination and approval
                    </p>
                    <div className="flex justify-end mt-2">
                      <svg
                        className="w-6 h-6 text-blue-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="border rounded-lg p-4 hover:bg-blue-50 transition cursor-pointer">
                    <h4 className="text-sm font-medium text-black">
                      Co-Supervisor Assignment
                    </h4>
                    <p className="text-xs text-black mt-1">
                      Co-supervisor nomination and approval forms
                    </p>
                    <div className="flex justify-end mt-2">
                      <svg
                        className="w-6 h-6 text-blue-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="border rounded-lg p-4 hover:bg-blue-50 transition cursor-pointer">
                    <h4 className="text-sm font-medium text-black">
                      DSC Formation
                    </h4>
                    <p className="text-xs text-black mt-1">
                      Doctoral committee constitution forms
                    </p>
                    <div className="flex justify-end mt-2">
                      <svg
                        className="w-6 h-6 text-blue-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="border rounded-lg p-4 hover:bg-blue-50 transition cursor-pointer">
                    <h4 className="text-sm font-medium text-black">
                      DSC Formation
                    </h4>
                    <p className="text-xs text-black mt-1">
                      Doctoral committee constitution forms
                    </p>
                    <div className="flex justify-end mt-2">
                      <svg
                        className="w-6 h-6 text-blue-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Course Work and Registration Documents */}
              <Card title="Course Work and Registration Documents">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border rounded-lg p-4 hover:bg-blue-50 transition cursor-pointer">
                    <h4 className="text-sm font-medium text-black">
                      Course Registration
                    </h4>
                    <p className="text-xs text-black mt-1">
                      Course selection and registration forms
                    </p>
                    <div className="flex justify-end mt-2">
                      <svg
                        className="w-6 h-6 text-blue-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="border rounded-lg p-4 hover:bg-blue-50 transition cursor-pointer">
                    <h4 className="text-sm font-medium text-black">
                      Course Completion
                    </h4>
                    <p className="text-xs text-black mt-1">
                      Course work completion certificates
                    </p>
                    <div className="flex justify-end mt-2">
                      <svg
                        className="w-6 h-6 text-blue-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="border rounded-lg p-4 hover:bg-blue-50 transition cursor-pointer">
                    <h4 className="text-sm font-medium text-black">
                      Research Registration
                    </h4>
                    <p className="text-xs text-black mt-1">
                      Research proposal registration forms
                    </p>
                    <div className="flex justify-end mt-2">
                      <svg
                        className="w-6 h-6 text-blue-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="border rounded-lg p-4 hover:bg-blue-50 transition cursor-pointer">
                    <h4 className="text-sm font-medium text-black">
                      Academic Credit Transfer
                    </h4>
                    <p className="text-xs text-black mt-1">
                      Credit transfer applications and approvals
                    </p>
                    <div className="flex justify-end mt-2">
                      <svg
                        className="w-6 h-6 text-blue-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          )}

          {/* Fees Tab */}
          {activeTab === "fees" && (
            <div className="space-y-6">
              {/* Fee Overview */}
              <Card title="Fee Overview">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                  <div className="bg-blue-50 rounded-lg p-4">
                    <h4 className="text-sm font-medium text-black">
                      Total Fees Due
                    </h4>
                    <p className="text-2xl font-bold text-black mt-2">
                      ₹10,000
                    </p>
                  </div>
                  <div className="bg-green-50 rounded-lg p-4">
                    <h4 className="text-sm font-medium text-black">
                      Total Paid
                    </h4>
                    <p className="text-2xl font-bold text-black mt-2">
                      ₹15,000
                    </p>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-4">
                    <h4 className="text-sm font-medium text-black">
                      Next Payment Due
                    </h4>
                    <p className="text-2xl font-bold text-black mt-2">
                      Jun 30, 2025
                    </p>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-4 py-3 text-left text-xs font-medium text-black uppercase tracking-wider"
                        >
                          Fee Item
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3 text-left text-xs font-medium text-black uppercase tracking-wider"
                        >
                          Amount
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3 text-left text-xs font-medium text-black uppercase tracking-wider"
                        >
                          Due Date
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3 text-left text-xs font-medium text-black uppercase tracking-wider"
                        >
                          Status
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3 text-left text-xs font-medium text-black uppercase tracking-wider"
                        >
                          Receipt
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {scholarData.fees.map((fee) => (
                        <tr key={fee.id}>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <div className="text-sm font-medium text-black">
                              {fee.name}
                            </div>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <div className="text-sm text-black">
                              ₹{fee.amount}
                            </div>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <div className="text-sm text-black">
                              {fee.date || "June 30, 2025"}
                            </div>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <StatusBadge status={fee.status} />
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            {fee.receipt ? (
                              <button className="text-blue-600 hover:text-blue-800 text-sm">
                                View
                              </button>
                            ) : (
                              <button className="bg-blue-600 text-white text-xs font-medium py-1 px-3 rounded hover:bg-blue-700 transition">
                                Pay Now
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>

              {/* Payment History */}
              <Card title="Payment History">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-4 py-3 text-left text-xs font-medium text-black uppercase tracking-wider"
                        >
                          Transaction ID
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3 text-left text-xs font-medium text-black uppercase tracking-wider"
                        >
                          Date
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3 text-left text-xs font-medium text-black uppercase tracking-wider"
                        >
                          Description
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3 text-left text-xs font-medium text-black uppercase tracking-wider"
                        >
                          Amount
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3 text-left text-xs font-medium text-black uppercase tracking-wider"
                        >
                          Receipt
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="text-sm text-black">TXN-001</div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="text-sm text-black">05/01/2024</div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="text-sm text-black">
                            Registration Fee
                          </div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="text-sm text-black">₹5,000</div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <button className="text-blue-600 hover:text-blue-800 text-sm">
                            Download
                          </button>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="text-sm text-black">TXN-002</div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="text-sm text-black">10/01/2024</div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="text-sm text-black">
                            Semester Fee (1st)
                          </div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="text-sm text-black">₹10,000</div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <button className="text-blue-600 hover:text-blue-800 text-sm">
                            Download
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </Card>
            </div>
          )}
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-8">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-sm text-black">
                © 2025 JIS University. All rights reserved.
              </p>
            </div>
            <div className="flex space-x-4">
              <a href="#" className="text-sm text-black hover:text-blue-600">
                Help Center
              </a>
              <a href="#" className="text-sm text-black hover:text-blue-600">
                Terms of Service
              </a>
              <a href="#" className="text-sm text-black hover:text-blue-600">
                Privacy Policy
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
