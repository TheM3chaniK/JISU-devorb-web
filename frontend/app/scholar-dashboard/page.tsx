"use client";
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
// Removed unused Link import

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
    vivaVoce: { status: "Not Started", date: null, details: null }
  },
  fees: [
    { id: 1, name: "Registration Fee", amount: 5000, status: "Paid", receipt: "REC-001", date: "05/01/2024" },
    { id: 2, name: "Semester Fee (1st)", amount: 10000, status: "Paid", receipt: "REC-002", date: "10/01/2024" },
    { id: 3, name: "Semester Fee (2nd)", amount: 10000, status: "Due", receipt: null, date: null },
  ],
  notifications: [
    { id: 1, message: "Progress Report 3 requires your attention", date: "04/30/2025", read: false },
    { id: 2, message: "Supervisor has commented on your latest submission", date: "04/28/2025", read: true },
    { id: 3, message: "Semester fee payment reminder", date: "04/20/2025", read: true },
  ]
};

// Component for displaying status with appropriate color
const StatusBadge = ({ status }: { status: string }) => {
  let bgColor = "bg-gray-200 text-gray-800";
  
  if (status.toLowerCase().includes("approved")) {
    bgColor = "bg-green-100 text-green-800";
  } else if (status.toLowerCase().includes("pending")) {
    bgColor = "bg-amber-100 text-amber-800";
  } else if (status.toLowerCase().includes("not started")) {
    bgColor = "bg-gray-100 text-gray-800";
  } else if (status.toLowerCase().includes("rejected") || status.toLowerCase().includes("due")) {
    bgColor = "bg-red-100 text-red-800";
  }
  
  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${bgColor}`}>
      {status}
    </span>
  );
};

// Dashboard header component
const DashboardHeader = ({ name, enrollmentId }: { name: string; enrollmentId: string }) => (
  <div className="bg-white border-b border-gray-200 px-4 py-5 sm:px-6 mb-6 rounded-lg shadow-sm">
    <div className="flex items-center justify-between">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">{name}</h2>
        <p className="text-sm text-gray-500">Enrollment ID: {enrollmentId}</p>
      </div>
      <div className="flex space-x-3">
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

// Card component for dashboard sections
interface CardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

const Card = ({ title, children, className = "" }: CardProps) => (
  <div className={`bg-white rounded-xl shadow-sm overflow-hidden ${className}`}>
    <div className="border-b border-gray-200 bg-gray-50 px-4 py-3">
      <h3 className="text-md font-medium text-gray-800">{title}</h3>
    </div>
    <div className="p-4">{children}</div>
  </div>
);

// Progress indicator component
interface Step {
  name: string;
  completed: boolean;
}

const ProgressIndicator = ({ steps }: { steps: Step[] }) => {
  return (
    <div className="w-full py-2">
      <div className="flex items-center justify-between w-full">
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              step.completed ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'
            }`}>
              {step.completed ? (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              ) : (
                index + 1
              )}
            </div>
            <span className="text-xs mt-1 text-center text-gray-600">{step.name}</span>
            {index < steps.length - 1 && (
              <div className={`h-0.5 w-12 sm:w-16 md:w-24 lg:w-32 -mt-4 ${
                step.completed ? 'bg-blue-600' : 'bg-gray-200'
              }`} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default function ScholarDashboard() {
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  
  useEffect(() => {
    setMounted(true);
  }, []);

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.3 } }
  };

  const phases: Step[] = [
    { name: "Application", completed: scholarData.progress.applicationApproved },
    { name: "Supervisor", completed: scholarData.progress.supervisorAssigned },
    { name: "Proposal", completed: scholarData.progress.researchProposalApproved },
    { name: "Course Work", completed: scholarData.progress.courseWorkCompleted },
    { name: "Progress", completed: scholarData.progress.progressReports[0].status === "Approved" },
    { name: "Pre-Submission", completed: scholarData.progress.preSubmission.status === "Approved" },
    { name: "Thesis", completed: scholarData.progress.thesisSubmission.status === "Approved" },
    { name: "Viva Voce", completed: scholarData.progress.vivaVoce.status === "Approved" }
  ];

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Header - This would be your common header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-blue-600">JIS University</h1>
            <span className="mx-2 text-gray-400">|</span>
            <h2 className="text-gray-600 text-sm">Ph.D. Management System</h2>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <button className="text-gray-500 hover:text-gray-700">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                {scholarData.notifications.filter(n => !n.read).length > 0 && (
                  <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500"></span>
                )}
              </button>
            </div>
            <div className="h-8 w-8 rounded-full bg-blue-600 text-white flex items-center justify-center">
              {scholarData.name.charAt(0)}
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Scholar Dashboard Header */}
        <DashboardHeader name={scholarData.name} enrollmentId={scholarData.enrollmentId} />
        
        {/* Progress Tracker */}
        <div className="mb-8 bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-medium text-gray-800 mb-4">Ph.D. Journey Progress</h3>
          <ProgressIndicator steps={phases} />
        </div>

        {/* Tab Navigation */}
        <div className="mb-6 bg-white rounded-lg shadow-sm">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab('overview')}
                className={`py-4 px-6 font-medium text-sm ${
                  activeTab === 'overview'
                    ? 'border-b-2 border-blue-500 text-blue-600'
                    : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('submissions')}
                className={`py-4 px-6 font-medium text-sm ${
                  activeTab === 'submissions'
                    ? 'border-b-2 border-blue-500 text-blue-600'
                    : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Submissions
              </button>
              <button
                onClick={() => setActiveTab('forms')}
                className={`py-4 px-6 font-medium text-sm ${
                  activeTab === 'forms'
                    ? 'border-b-2 border-blue-500 text-blue-600'
                    : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Forms
              </button>
              <button
                onClick={() => setActiveTab('fees')}
                className={`py-4 px-6 font-medium text-sm ${
                  activeTab === 'fees'
                    ? 'border-b-2 border-blue-500 text-blue-600'
                    : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
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
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Research Details */}
              <Card title="Research Information" className="md:col-span-2">
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Department</h4>
                    <p className="mt-1">{scholarData.department}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Research Topic</h4>
                    <p className="mt-1">{scholarData.researchTopic}</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Supervisor</h4>
                      <p className="mt-1">{scholarData.supervisor}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Co-Supervisor</h4>
                      <p className="mt-1">{scholarData.coSupervisor || "Not Assigned"}</p>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Notifications */}
              <Card title="Notifications" className="">
                <div className="space-y-3">
                  {scholarData.notifications.length === 0 ? (
                    <p className="text-sm text-gray-500">No new notifications</p>
                  ) : (
                    scholarData.notifications.map(notification => (
                      <div 
                        key={notification.id}
                        className={`p-3 rounded-lg border ${notification.read ? 'bg-white border-gray-200' : 'bg-blue-50 border-blue-200'}`}
                      >
                        <p className="text-sm">{notification.message}</p>
                        <p className="text-xs text-gray-500 mt-1">{notification.date}</p>
                      </div>
                    ))
                  )}
                </div>
              </Card>

              {/* DSC Members */}
              <Card title="DSC Members" className="">
                <ul className="divide-y divide-gray-200">
                  {scholarData.dscMembers.map((member, index) => (
                    <li key={index} className="py-2 flex items-center">
                      <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 mr-3">
                        {member.split(' ')[0][0]}
                      </div>
                      <span>{member}</span>
                    </li>
                  ))}
                </ul>
              </Card>

              {/* Quick Links */}
              <Card title="Quick Actions" className="">
                <div className="grid grid-cols-2 gap-3">
                  <button className="bg-blue-50 hover:bg-blue-100 text-blue-700 font-medium py-2 px-4 rounded-lg text-sm border border-blue-200 transition">
                    Submit Report
                  </button>
                  <button className="bg-purple-50 hover:bg-purple-100 text-purple-700 font-medium py-2 px-4 rounded-lg text-sm border border-purple-200 transition">
                    Upload Document
                  </button>
                  <button className="bg-green-50 hover:bg-green-100 text-green-700 font-medium py-2 px-4 rounded-lg text-sm border border-green-200 transition">
                    Pay Fees
                  </button>
                  <button className="bg-amber-50 hover:bg-amber-100 text-amber-700 font-medium py-2 px-4 rounded-lg text-sm border border-amber-200 transition">
                    Contact Supervisor
                  </button>
                </div>
              </Card>

              {/* Next Steps */}
              <Card title="Next Steps" className="md:col-span-2">
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mr-4">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">Complete Progress Report 3</h4>
                      <p className="text-xs text-gray-500">Due by May 31, 2025</p>
                    </div>
                    <button className="ml-auto bg-blue-600 text-white text-xs font-medium py-1 px-3 rounded hover:bg-blue-700 transition">
                      Start
                    </button>
                  </div>
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-red-100 text-red-600 flex items-center justify-center mr-4">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">Pay Second Semester Fee</h4>
                      <p className="text-xs text-gray-500">Due by June 15, 2025</p>
                    </div>
                    <button className="ml-auto bg-blue-600 text-white text-xs font-medium py-1 px-3 rounded hover:bg-blue-700 transition">
                      Pay Now
                    </button>
                  </div>
                </div>
              </Card>
            </div>
          )}

          {/* Submissions Tab */}
          {activeTab === 'submissions' && (
            <div className="space-y-6">
              {/* Research Proposal */}
              <Card title="Research Proposal" className="">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium">Research Proposal Document</h4>
                    <p className="text-xs text-gray-500 mt-1">Uploaded on January 15, 2024</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <StatusBadge status="Approved" />
                    <button className="text-blue-600 hover:text-blue-800 text-sm">
                      View
                    </button>
                  </div>
                </div>
              </Card>

              {/* Course Work */}
              <Card title="Course Work" className="">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium">Course Work Results</h4>
                      <p className="text-xs text-gray-500 mt-1">Uploaded on February 10, 2024</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <StatusBadge status="Approved" />
                      <button className="text-blue-600 hover:text-blue-800 text-sm">
                        View
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium">Comprehensive Viva Report</h4>
                      <p className="text-xs text-gray-500 mt-1">Uploaded on March 5, 2024</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <StatusBadge status="Approved" />
                      <button className="text-blue-600 hover:text-blue-800 text-sm">
                        View
                      </button>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Progress Reports */}
              <Card title="Progress Reports" className="">
                <div className="space-y-4">
                  {scholarData.progress.progressReports.map((report) => (
                    <div key={report.id} className="flex items-center justify-between border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                      <div>
                        <h4 className="text-sm font-medium">Progress Report {report.id}</h4>
                        {report.date ? (
                          <p className="text-xs text-gray-500 mt-1">Submitted on {report.date}</p>
                        ) : (
                          <p className="text-xs text-gray-500 mt-1">Not yet submitted</p>
                        )}
                      </div>
                      <div className="flex items-center space-x-3">
                        <StatusBadge status={report.status} />
                        {report.status === "Not Started" ? (
                          <button className="bg-blue-600 text-white text-xs font-medium py-1 px-3 rounded hover:bg-blue-700 transition">
                            Upload
                          </button>
                        ) : (
                          <button className="text-blue-600 hover:text-blue-800 text-sm">
                            View
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Pre-Submission */}
              <Card title="Pre-Submission" className="">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium">5000-word Write-up</h4>
                      <p className="text-xs text-gray-500 mt-1">Not yet submitted</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <StatusBadge status="Not Started" />
                      <button className="bg-gray-200 text-gray-600 text-xs font-medium py-1 px-3 rounded hover:bg-gray-300 transition" disabled>
                        Upload
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium">Pre-submission Seminar Report</h4>
                      <p className="text-xs text-gray-500 mt-1">Not yet submitted</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <StatusBadge status="Not Started" />
                      <button className="bg-gray-200 text-gray-600 text-xs font-medium py-1 px-3 rounded hover:bg-gray-300 transition" disabled>
                        Upload
                      </button>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Final Thesis */}
              <Card title="Final Thesis Submission" className="">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium">Final Thesis</h4>
                      <p className="text-xs text-gray-500 mt-1">Not yet submitted</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <StatusBadge status="Not Started" />
                      <button className="bg-gray-200 text-gray-600 text-xs font-medium py-1 px-3 rounded hover:bg-gray-300 transition" disabled>
                        Upload
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium">Plagiarism Report</h4>
                      <p className="text-xs text-gray-500 mt-1">Not yet submitted</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <StatusBadge status="Not Started" />
                      <button className="bg-gray-200 text-gray-600 text-xs font-medium py-1 px-3 rounded hover:bg-gray-300 transition" disabled>
                        Upload
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium">List of Publications</h4>
                      <p className="text-xs text-gray-500 mt-1">Not yet submitted</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <StatusBadge status="Not Started" />
                      <button className="bg-gray-200 text-gray-600 text-xs font-medium py-1 px-3 rounded hover:bg-gray-300 transition" disabled>
                        Upload
                      </button>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          )}

          {/* Forms Tab */}
          {activeTab === 'forms' && (
            <div className="space-y-6">
              {/* Available Forms */}
              <Card title="Available Forms">
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                    <div>
                      <h4 className="text-sm font-medium">Ph.D. Registration Form</h4>
                      <p className="text-xs text-gray-500 mt-1">For initial registration</p>
                    </div>
                    <button className="bg-blue-600 text-white text-xs font-medium py-1 px-3 rounded hover:bg-blue-700 transition">
                      Download
                    </button>
                  </div>
                  <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                    <div>
                      <h4 className="text-sm font-medium">Progress Report Template</h4>
                      <p className="text-xs text-gray-500 mt-1">For periodic progress reports</p>
                    </div>
                    <button className="bg-blue-600 text-white text-xs font-medium py-1 px-3 rounded hover:bg-blue-700 transition">
                      Download
                    </button>
                  </div>
                  <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                    <div>
                      <h4 className="text-sm font-medium">Thesis Submission Form</h4>
                      <p className="text-xs text-gray-500 mt-1">For final thesis submission</p>
                    </div>
                    <button className="bg-blue-600 text-white text-xs font-medium py-1 px-3 rounded hover:bg-blue-700 transition">
                      Download
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium">No Dues Certificate</h4>
                      <p className="text-xs text-gray-500 mt-1">For final clearance</p>
                    </div>
                    <button className="bg-blue-600 text-white text-xs font-medium py-1 px-3 rounded hover:bg-blue-700 transition">
                      Download
                    </button>
                  </div>
                </div>
              </Card>

              {/* Submitted Forms */}
              <Card title="Submitted Forms">
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                    <div>
                      <h4 className="text-sm font-medium">Ph.D. Registration Form</h4>
                      <p className="text-xs text-gray-500 mt-1">Submitted on January 5, 2024</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <StatusBadge status="Approved" />
                      <button className="text-blue-600 hover:text-blue-800 text-sm">
                        View
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                    <div>
                      <h4 className="text-sm font-medium">Research Proposal Form</h4>
                      <p className="text-xs text-gray-500 mt-1">Submitted on February 10, 2024</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <StatusBadge status="Approved" />
                      <button className="text-blue-600 hover:text-blue-800 text-sm">
                        View
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                    <div>
                      <h4 className="text-sm font-medium">Course Work Completion Form</h4>
                      <p className="text-xs text-gray-500 mt-1">Submitted on March 15, 2024</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <StatusBadge status="Approved" />
                      <button className="text-blue-600 hover:text-blue-800 text-sm">
                        View
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium">DSC Formation Request</h4>
                      <p className="text-xs text-gray-500 mt-1">Submitted on January 25, 2024</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <StatusBadge status="Approved" />
                      <button className="text-blue-600 hover:text-blue-800 text-sm">
                        View
                      </button>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          )}

          {/* Fees Tab */}
          {activeTab === 'fees' && (
            <div className="space-y-6">
              {/* Fee Overview */}
              <Card title="Fee Overview">
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-gray-50 rounded-lg p-4 text-center">
                    <p className="text-sm text-gray-500 mb-1">Total Paid</p>
                    <p className="text-2xl font-semibold text-gray-800">₹15,000</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4 text-center">
                    <p className="text-sm text-gray-500 mb-1">Due Amount</p>
                    <p className="text-2xl font-semibold text-red-600">₹10,000</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4 text-center">
                    <p className="text-sm text-gray-500 mb-1">Total Cost</p>
                    <p className="text-2xl font-semibold text-gray-800">₹25,000</p>
                  </div>
                </div>
              </Card>

              {/* Fee Payment History */}
              <Card title="Fee Payment History">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Fee Type
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Amount
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Due Date
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {scholarData.fees.map((fee) => (
                        <tr key={fee.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{fee.name}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">₹{fee.amount}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{fee.date || "June 15, 2025"}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <StatusBadge status={fee.status} />
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            {fee.status === "Paid" ? (
                              <button className="text-blue-600 hover:text-blue-800">
                                View Receipt
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

              {/* Payment Methods */}
              <Card title="Payment Methods">
                <div className="space-y-4">
                  <div className="border rounded-lg p-4 bg-gray-50">
                    <h4 className="text-sm font-medium mb-2">Bank Transfer</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-gray-500">Account Name</p>
                        <p className="text-sm">JIS University</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Account Number</p>
                        <p className="text-sm">123456789012345</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">IFSC Code</p>
                        <p className="text-sm">ABCD0001234</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Bank Name</p>
                        <p className="text-sm">State Bank of India</p>
                      </div>
                    </div>
                  </div>
                  <div className="border rounded-lg p-4 bg-gray-50">
                    <h4 className="text-sm font-medium mb-2">Online Payment</h4>
                    <p className="text-sm text-gray-600 mb-3">Pay securely online using your credit/debit card</p>
                    <button className="bg-blue-600 text-white text-sm font-medium py-2 px-4 rounded hover:bg-blue-700 transition">
                      Pay Online
                    </button>
                  </div>
                </div>
              </Card>
            </div>
          )}
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-6 mt-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-sm text-gray-600">© 2025 JIS University. All rights reserved.</p>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-sm text-gray-600 hover:text-blue-600">Help & Support</a>
              <a href="#" className="text-sm text-gray-600 hover:text-blue-600">Privacy Policy</a>
              <a href="#" className="text-sm text-gray-600 hover:text-blue-600">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}