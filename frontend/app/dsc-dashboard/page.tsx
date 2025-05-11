//this dashboard will run on [id] route because there will be multiple dsc in the university system that will be handled by this page
"use client";
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Sample data for demonstration
const assignedStudents = [
  {
    id: "BIO2023001",
    name: "Priya Sharma",
    supervisor: "Dr. Anjali Gupta",
    coSupervisor: "Dr. Rajesh Kumar",
    researchTopic: "Molecular Analysis of Plant Growth Factors in Urban Environments",
    stage: "Progress Report 3",
    lastUpdate: "2025-04-25"
  },
  {
    id: "BIO2023005",
    name: "Arjun Malhotra",
    supervisor: "Dr. Sanjay Verma",
    coSupervisor: "N/A",
    researchTopic: "Genetic Markers for Drought Resistance in Rice Varieties",
    stage: "Pre-Submission",
    lastUpdate: "2025-05-01"
  },
  {
    id: "BIO2022012",
    name: "Meera Patel",
    supervisor: "Dr. Anjali Gupta",
    coSupervisor: "Dr. Vikram Singh",
    researchTopic: "Microbial Diversity in River Ecosystems Post Industrial Treatment",
    stage: "Final Thesis Evaluation",
    lastUpdate: "2025-05-08"
  }
];

const pendingApprovals = [
  {
    id: "REQ2025051",
    studentId: "BIO2023001",
    studentName: "Priya Sharma",
    requestType: "Progress Report 3",
    submittedOn: "2025-05-02",
    status: "Pending Review"
  },
  {
    id: "REQ2025048",
    studentId: "BIO2022012",
    studentName: "Meera Patel",
    requestType: "Final Thesis Evaluation",
    submittedOn: "2025-04-28",
    status: "Pending Review"
  }
];

export default function DscDashboard() {
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState('students');

  useEffect(() => {
    setMounted(true);
  }, []);

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'students':
        return (
          <motion.div 
            variants={container}
            initial="hidden"
            animate="show"
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold mb-2">Assigned Students Overview</h3>
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="bg-purple-50 text-purple-700">
                    <tr>
                      <th className="px-4 py-3">ID</th>
                      <th className="px-4 py-3">Name</th>
                      <th className="px-4 py-3">Supervisor</th>
                      <th className="px-4 py-3">Research Topic</th>
                      <th className="px-4 py-3">Current Stage</th>
                      <th className="px-4 py-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {assignedStudents.map((student, index) => (
                      <motion.tr 
                        key={student.id} 
                        variants={item}
                        className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                      >
                        <td className="px-4 py-3">{student.id}</td>
                        <td className="px-4 py-3 font-medium">{student.name}</td>
                        <td className="px-4 py-3">{student.supervisor}</td>
                        <td className="px-4 py-3 max-w-md truncate">{student.researchTopic}</td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            student.stage === 'Final Thesis Evaluation' 
                              ? 'bg-blue-100 text-blue-800' 
                              : student.stage === 'Pre-Submission' 
                                ? 'bg-amber-100 text-amber-800' 
                                : 'bg-green-100 text-green-800'
                          }`}>
                            {student.stage}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <button className="text-purple-600 hover:text-purple-900">
                            View Details
                          </button>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        );
      
      case 'approvals':
        return (
          <motion.div 
            variants={container}
            initial="hidden"
            animate="show"
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold mb-2">Pending Approvals</h3>
            <div className="grid grid-cols-1 gap-4">
              {pendingApprovals.map((request) => (
                <motion.div 
                  key={request.id} 
                  variants={item}
                  className="bg-white p-5 rounded-lg shadow-md border-l-4 border-purple-500"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium text-gray-800">{request.requestType}</h4>
                      <p className="text-sm text-gray-600">Student: {request.studentName} ({request.studentId})</p>
                      <p className="text-sm text-gray-500">Submitted on: {request.submittedOn}</p>
                    </div>
                    <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded">
                      {request.status}
                    </span>
                  </div>
                  <div className="mt-4 flex space-x-3">
                    <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-sm">
                      Review Submission
                    </button>
                    <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm">
                      View Documents
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        );
        
      case 'researchProposals':
        return (
          <motion.div 
            variants={container}
            initial="hidden"
            animate="show"
            className="bg-white p-6 rounded-lg shadow-md"
          >
            <h3 className="text-lg font-semibold mb-4">Research Proposal Evaluation</h3>
            <p className="text-gray-600 mb-4">No pending research proposals to evaluate at this time.</p>
            <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
              <p className="text-sm text-purple-700">Research proposals appear here after they have been approved by the supervisor and co-supervisor.</p>
            </div>
          </motion.div>
        );
        
      case 'progressReports':
        return (
          <motion.div 
            variants={container}
            initial="hidden"
            animate="show"
            className="bg-white p-6 rounded-lg shadow-md"
          >
            <h3 className="text-lg font-semibold mb-4">Progress Report Evaluation</h3>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Filter by Report Number</label>
              <select className="w-full border-gray-300 rounded-md shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-500 focus:ring-opacity-50">
                <option>All Reports</option>
                <option>Report 1</option>
                <option>Report 2</option>
                <option>Report 3</option>
                <option>Report 4</option>
                <option>Report 5</option>
                <option>Report 6</option>
              </select>
            </div>
            
            <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium">Progress Report 3</h4>
                  <p className="text-sm text-gray-600">Priya Sharma (BIO2023001)</p>
                  <p className="text-sm text-gray-500 mt-1">Submitted on: May 2, 2025</p>
                </div>
                <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded">
                  Pending Review
                </span>
              </div>
              <div className="mt-3">
                <p className="text-sm text-gray-700">Research Progress: Molecular Analysis of Plant Growth Factors in Urban Environments</p>
              </div>
              <div className="mt-4 flex space-x-3">
                <button className="px-3 py-1.5 bg-purple-600 text-white rounded hover:bg-purple-700 text-sm">
                  Review Report
                </button>
                <button className="px-3 py-1.5 bg-gray-100 text-gray-700 border border-gray-300 rounded hover:bg-gray-200 text-sm">
                  Download PDF
                </button>
              </div>
            </div>
          </motion.div>
        );
        
      case 'preSubmission':
        return (
          <motion.div 
            variants={container}
            initial="hidden"
            animate="show"
            className="bg-white p-6 rounded-lg shadow-md"
          >
            <h3 className="text-lg font-semibold mb-4">Pre-Submission Review</h3>
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium">Pre-submission Documents</h4>
                  <p className="text-sm text-gray-600">Arjun Malhotra (BIO2023005)</p>
                  <p className="text-sm text-gray-500 mt-1">Submitted on: May 1, 2025</p>
                </div>
                <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                  In Review
                </span>
              </div>
              <div className="mt-3">
                <p className="text-sm text-gray-700">Research Topic: Genetic Markers for Drought Resistance in Rice Varieties</p>
              </div>
              <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-2">
                <div className="bg-gray-50 p-2 rounded flex items-center justify-between">
                  <span className="text-sm">5000-word Write-up</span>
                  <button className="text-purple-600 hover:text-purple-800 text-sm">View</button>
                </div>
                <div className="bg-gray-50 p-2 rounded flex items-center justify-between">
                  <span className="text-sm">Pre-submission Seminar Report</span>
                  <button className="text-purple-600 hover:text-purple-800 text-sm">View</button>
                </div>
              </div>
              <div className="mt-4 flex space-x-3">
                <button className="px-3 py-1.5 bg-purple-600 text-white rounded hover:bg-purple-700 text-sm">
                  Review Submission
                </button>
                <button className="px-3 py-1.5 bg-gray-100 text-gray-700 border border-gray-300 rounded hover:bg-gray-200 text-sm">
                  Request Changes
                </button>
              </div>
            </div>
          </motion.div>
        );
        
      case 'finalThesis':
        return (
          <motion.div 
            variants={container}
            initial="hidden"
            animate="show"
            className="bg-white p-6 rounded-lg shadow-md"
          >
            <h3 className="text-lg font-semibold mb-4">Final Thesis Evaluation</h3>
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium">Final Thesis Submission</h4>
                  <p className="text-sm text-gray-600">Meera Patel (BIO2022012)</p>
                  <p className="text-sm text-gray-500 mt-1">Submitted on: April 28, 2025</p>
                </div>
                <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded">
                  Requires Attention
                </span>
              </div>
              <div className="mt-3">
                <p className="text-sm text-gray-700">Research Topic: Microbial Diversity in River Ecosystems Post Industrial Treatment</p>
              </div>
              <div className="mt-3">
                <p className="text-sm font-medium text-gray-700">External Examiner Reports:</p>
                <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-2">
                  <div className="bg-gray-50 p-2 rounded flex items-center justify-between">
                    <span className="text-sm">Examiner 1 Report</span>
                    <button className="text-purple-600 hover:text-purple-800 text-sm">View</button>
                  </div>
                  <div className="bg-gray-50 p-2 rounded flex items-center justify-between">
                    <span className="text-sm">Examiner 2 Report</span>
                    <button className="text-purple-600 hover:text-purple-800 text-sm">View</button>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex space-x-3">
                <button className="px-3 py-1.5 bg-purple-600 text-white rounded hover:bg-purple-700 text-sm">
                  Submit Recommendations
                </button>
                <button className="px-3 py-1.5 bg-gray-100 text-gray-700 border border-gray-300 rounded hover:bg-gray-200 text-sm">
                  Download Thesis
                </button>
              </div>
            </div>
          </motion.div>
        );
        
      case 'directory':
        return (
          <motion.div 
            variants={container}
            initial="hidden"
            animate="show"
            className="bg-white p-6 rounded-lg shadow-md"
          >
            <h3 className="text-lg font-semibold mb-4">Detailed Directory</h3>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Search Student</label>
              <input 
                type="text" 
                placeholder="Enter student name or ID" 
                className="w-full border-gray-300 rounded-md shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-500 focus:ring-opacity-50"
              />
            </div>
            
            <div className="divide-y">
              {assignedStudents.map((student) => (
                <motion.div 
                  key={student.id} 
                  variants={item}
                  className="py-4"
                >
                  <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                    <div>
                      <h4 className="font-medium text-gray-800">{student.name}</h4>
                      <p className="text-sm text-gray-600">ID: {student.id}</p>
                    </div>
                    <button className="mt-2 md:mt-0 text-sm text-purple-600 hover:text-purple-800">
                      View Full Profile
                    </button>
                  </div>
                  <div className="mt-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                      <p className="text-xs text-gray-500">Supervisor</p>
                      <p className="text-sm font-medium">{student.supervisor}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Co-Supervisor</p>
                      <p className="text-sm font-medium">{student.coSupervisor}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Current Stage</p>
                      <p className="text-sm font-medium">{student.stage}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        );
        
      case 'logs':
        return (
          <motion.div 
            variants={container}
            initial="hidden"
            animate="show"
            className="bg-white p-6 rounded-lg shadow-md"
          >
            <h3 className="text-lg font-semibold mb-4">Remarks & Action Logs</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex-grow">
                  <input 
                    type="text" 
                    placeholder="Filter logs by keyword" 
                    className="w-full border-gray-300 rounded-md shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-500 focus:ring-opacity-50"
                  />
                </div>
                <div>
                  <select className="border-gray-300 rounded-md shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-500 focus:ring-opacity-50">
                    <option>All Actions</option>
                    <option>Approvals</option>
                    <option>Rejections</option>
                    <option>Comments</option>
                  </select>
                </div>
              </div>
              
              <motion.div variants={item} className="border-l-4 border-green-500 pl-4 py-2">
                <p className="text-sm font-medium">Progress Report 2 Approved</p>
                <p className="text-xs text-gray-600">Student: Priya Sharma (BIO2023001)</p>
                <p className="text-xs text-gray-500">April 12, 2025 at 10:23 AM</p>
                <p className="text-sm text-gray-700 mt-1">Remark: Good progress on molecular analysis. Methods section is well-structured.</p>
              </motion.div>
              
              <motion.div variants={item} className="border-l-4 border-amber-500 pl-4 py-2">
                <p className="text-sm font-medium">Research Proposal Revision Requested</p>
                <p className="text-xs text-gray-600">Student: Arjun Malhotra (BIO2023005)</p>
                <p className="text-xs text-gray-500">March 28, 2025 at 03:45 PM</p>
                <p className="text-sm text-gray-700 mt-1">Remark: Literature review needs strengthening with more recent publications. Please revise methodology section.</p>
              </motion.div>
              
              <motion.div variants={item} className="border-l-4 border-green-500 pl-4 py-2">
                <p className="text-sm font-medium">Pre-submission Seminar Approved</p>
                <p className="text-xs text-gray-600">Student: Meera Patel (BIO2022012)</p>
                <p className="text-xs text-gray-500">April 05, 2025 at 11:30 AM</p>
                <p className="text-sm text-gray-700 mt-1">Remark: Excellent presentation. Research findings are significant and well-presented.</p>
              </motion.div>
            </div>
          </motion.div>
        );
        
      default:
        return null;
    }
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <svg className="h-8 w-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <div className="ml-3">
                <h1 className="text-lg font-bold text-gray-900">DSC Dashboard</h1>
                <p className="text-sm text-gray-600">Bioscience Department</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <button className="text-gray-500 hover:text-gray-700 focus:outline-none">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                </button>
                <div className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-xs text-white">2</span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-full bg-purple-200 text-purple-700 flex items-center justify-center font-medium">
                  DC
                </div>
                <span className="text-sm font-medium text-gray-700">Dr. Chatterjee</span>
              </div>
              <button className="text-gray-500 hover:text-gray-700 focus:outline-none">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-4 bg-purple-600 text-white">
                <h2 className="font-medium">DSC - Bioscience</h2>
                <p className="text-sm text-purple-100">Doctoral Scrutiny Committee</p>
              </div>
              <nav className="p-2">
                <ul className="space-y-1">
                  <li>
                    <button
                      onClick={() => setActiveTab('students')}
                      className={`w-full flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                        activeTab === 'students' 
                          ? 'bg-purple-50 text-purple-700' 
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <svg className="mr-3 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      Assigned Students
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setActiveTab('approvals')}
                      className={`w-full flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                        activeTab === 'approvals' 
                          ? 'bg-purple-50 text-purple-700' 
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <svg className="mr-3 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Pending Approvals
                      <span className="ml-auto bg-red-100 text-red-800 text-xs font-medium px-2 py-0.5 rounded">
                        2
                      </span>
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setActiveTab('researchProposals')}
                      className={`w-full flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                        activeTab === 'researchProposals' 
                          ? 'bg-purple-50 text-purple-700' 
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <svg className="mr-3 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      Research Proposals
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setActiveTab('progressReports')}
                      className={`w-full flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                        activeTab === 'progressReports' 
                          ? 'bg-purple-50 text-purple-700' 
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <svg className="mr-3 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      Progress Reports
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setActiveTab('preSubmission')}
                      className={`w-full flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                        activeTab === 'preSubmission' 
                          ? 'bg-purple-50 text-purple-700' 
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <svg className="mr-3 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                      Pre-Submission
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setActiveTab('finalThesis')}
                      className={`w-full flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                        activeTab === 'finalThesis' 
                          ? 'bg-purple-50 text-purple-700' 
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <svg className="mr-3 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                      Final Thesis
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setActiveTab('directory')}
                      className={`w-full flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                        activeTab === 'directory' 
                          ? 'bg-purple-50 text-purple-700' 
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <svg className="mr-3 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                      </svg>
                      Detailed Directory
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setActiveTab('logs')}
                      className={`w-full flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                        activeTab === 'logs' 
                          ? 'bg-purple-50 text-purple-700' 
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <svg className="mr-3 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                      Remarks & Logs
                    </button>
                  </li>
                </ul>
              </nav>
              
              {/* Quick Stats */}
              <div className="p-4 border-t border-gray-200">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Quick Stats</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-xs text-gray-500">Assigned Students</span>
                    <span className="text-xs font-medium">{assignedStudents.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs text-gray-500">Pending Approvals</span>
                    <span className="text-xs font-medium text-orange-500">2</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs text-gray-500">Thesis Evaluations</span>
                    <span className="text-xs font-medium text-blue-500">1</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Main Content Area */}
          <div className="flex-grow">
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800">DSC Dashboard</h2>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">Today is</span>
                  <span className="text-sm font-medium">May 11, 2025</span>
                </div>
              </div>
              <p className="text-gray-600">Welcome to the Doctoral Scrutiny Committee dashboard for the Bioscience Department. You have 3 assigned students and 2 pending approvals requiring your attention.</p>
            </div>
            
            {/* Tab Content Area */}
            {renderTabContent()}
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-white py-4 border-t border-gray-200 mt-auto">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-gray-500">
              © 2025 JIS University. All rights reserved.
            </div>
            <div className="flex items-center space-x-4 mt-2 md:mt-0">
              <a href="#" className="text-sm text-gray-500 hover:text-purple-600">Help</a>
              <a href="#" className="text-sm text-gray-500 hover:text-purple-600">Privacy Policy</a>
              <a href="#" className="text-sm text-gray-500 hover:text-purple-600">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}