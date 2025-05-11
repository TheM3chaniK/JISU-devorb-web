"use client";
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Components (You'll need to create these or adapt them from your existing components)
import Header from '../components/Header';
import Footer from '../components/Footer';
import StatCard from '../components/StatCard';

// Mock data for demonstration - replace with actual data fetching
const mockApplications = [
  { id: 'PHD2023001', name: 'Ananya Sharma', department: 'Computer Science', status: 'Pending Review', submissionDate: '2023-05-10' },
  { id: 'PHD2023002', name: 'Rahul Gupta', department: 'Electrical Engineering', status: 'Documents Verified', submissionDate: '2023-05-08' },
  { id: 'PHD2023003', name: 'Priya Patel', department: 'Mechanical Engineering', status: 'Approved', submissionDate: '2023-05-01' },
  { id: 'PHD2023004', name: 'Vikram Singh', department: 'Civil Engineering', status: 'Rejected', submissionDate: '2023-04-28' },
];

const mockStudents = [
  { id: 'PHD2023005', name: 'Deepak Kumar', department: 'Physics', status: 'Needs Supervisor', submissionDate: '2023-05-03' },
  { id: 'PHD2023006', name: 'Kavita Mishra', department: 'Chemistry', status: 'Needs Supervisor', submissionDate: '2023-05-04' },
];

const mockDscFormations = [
  { id: 'PHD2023007', name: 'Arjun Reddy', department: 'Mathematics', supervisor: 'Dr. Ramesh Shah', status: 'Pending DSC Formation' },
  { id: 'PHD2023008', name: 'Neha Singh', department: 'Biotechnology', supervisor: 'Dr. Sunita Verma', status: 'Pending DSC Formation' },
];

export default function DRCDashboard() {
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState('applications');

  useEffect(() => {
    setMounted(true);
  }, []);

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Header Component */}
      <Header />

      {/* Main Dashboard Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Dashboard Header */}
        <motion.div 
          className="mb-8"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">DRC Dashboard</h1>
              <p className="text-gray-600">Manage applications, allocate supervisors, and form DSCs</p>
            </div>
            <div className="mt-4 md:mt-0">
              <button className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg shadow-md transition mr-2">
                Generate Report
              </button>
              <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg shadow-md hover:bg-gray-50 transition">
                Settings
              </button>
            </div>
          </div>
        </motion.div>

        {/* Statistics Summary */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <StatCard 
            title="Pending Applications" 
            value="12" 
            change="+3"
            icon={<svg className="h-8 w-8 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>}
            bgColor="bg-amber-50"
            borderColor="border-amber-200"
          />
          <StatCard 
            title="Supervisor Allocations" 
            value="8" 
            change="+2"
            icon={<svg className="h-8 w-8 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>}
            bgColor="bg-emerald-50"
            borderColor="border-emerald-200"
          />
          <StatCard 
            title="DSC Formations" 
            value="5" 
            change="+1"
            icon={<svg className="h-8 w-8 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>}
            bgColor="bg-purple-50"
            borderColor="border-purple-200"
          />
          <StatCard 
            title="Final Approvals" 
            value="3" 
            change="0"
            icon={<svg className="h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>}
            bgColor="bg-blue-50"
            borderColor="border-blue-200"
          />
        </motion.div>

        {/* Tab Navigation */}
        <motion.div 
          className="border-b border-gray-200 mb-6"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <nav className="flex flex-wrap -mb-px">
            <button 
              className={`mr-4 py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'applications' 
                  ? 'border-amber-500 text-amber-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('applications')}
            >
              Student Applications
            </button>
            <button 
              className={`mr-4 py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'supervisors' 
                  ? 'border-amber-500 text-amber-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('supervisors')}
            >
              Supervisor Allocation
            </button>
            <button 
              className={`mr-4 py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'dsc' 
                  ? 'border-amber-500 text-amber-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('dsc')}
            >
              DSC Formation
            </button>
            <button 
              className={`mr-4 py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'pre-submission' 
                  ? 'border-amber-500 text-amber-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('pre-submission')}
            >
              Pre-Submission & Final Approvals
            </button>
            <button 
              className={`mr-4 py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'records' 
                  ? 'border-amber-500 text-amber-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('records')}
            >
              Full Records
            </button>
          </nav>
        </motion.div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {/* Student Applications Tab */}
          {activeTab === 'applications' && (
            <div>
              <div className="bg-white rounded-xl shadow-md mb-6 p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-gray-800">New Applications</h2>
                  <div className="flex gap-2">
                    <div className="relative">
                      <input 
                        type="text" 
                        placeholder="Search applications..." 
                        className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      />
                      <svg className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                    <select className="border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent">
                      <option value="">All Departments</option>
                      <option value="cs">Computer Science</option>
                      <option value="ee">Electrical Engineering</option>
                      <option value="me">Mechanical Engineering</option>
                      <option value="ce">Civil Engineering</option>
                    </select>
                    <button className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg shadow-sm transition">
                      Filter
                    </button>
                  </div>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                        <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                        <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                        <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Submission Date</th>
                        <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {mockApplications.map((application) => (
                        <tr key={application.id} className="hover:bg-gray-50">
                          <td className="py-4 px-4 text-sm text-gray-900">{application.id}</td>
                          <td className="py-4 px-4 text-sm text-gray-900">{application.name}</td>
                          <td className="py-4 px-4 text-sm text-gray-900">{application.department}</td>
                          <td className="py-4 px-4 text-sm">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              application.status === 'Pending Review' ? 'bg-yellow-100 text-yellow-800' :
                              application.status === 'Documents Verified' ? 'bg-blue-100 text-blue-800' :
                              application.status === 'Approved' ? 'bg-green-100 text-green-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {application.status}
                            </span>
                          </td>
                          <td className="py-4 px-4 text-sm text-gray-900">{application.submissionDate}</td>
                          <td className="py-4 px-4 text-sm">
                            <button className="text-amber-600 hover:text-amber-800 font-medium mr-2">View</button>
                            <button className="text-green-600 hover:text-green-800 font-medium mr-2">Verify</button>
                            <button className="text-red-600 hover:text-red-800 font-medium">Reject</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                <div className="mt-4 flex justify-between items-center">
                  <div className="text-sm text-gray-500">
                    Showing <span className="font-medium">1</span> to <span className="font-medium">4</span> of <span className="font-medium">4</span> results
                  </div>
                  <div className="flex space-x-2">
                    <button className="px-3 py-1 border border-gray-300 rounded-md bg-white text-gray-500 hover:bg-gray-50">
                      Previous
                    </button>
                    <button className="px-3 py-1 border border-gray-300 rounded-md bg-amber-600 text-white hover:bg-amber-700">
                      1
                    </button>
                    <button className="px-3 py-1 border border-gray-300 rounded-md bg-white text-gray-500 hover:bg-gray-50">
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Supervisor Allocation Tab */}
          {activeTab === 'supervisors' && (
            <div>
              <div className="bg-white rounded-xl shadow-md mb-6 p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-gray-800">Students Awaiting Supervisor Allocation</h2>
                  <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg shadow-sm transition">
                    Batch Allocate
                  </button>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                        <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                        <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                        <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {mockStudents.map((student) => (
                        <tr key={student.id} className="hover:bg-gray-50">
                          <td className="py-4 px-4 text-sm text-gray-900">{student.id}</td>
                          <td className="py-4 px-4 text-sm text-gray-900">{student.name}</td>
                          <td className="py-4 px-4 text-sm text-gray-900">{student.department}</td>
                          <td className="py-4 px-4 text-sm">
                            <span className="px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                              {student.status}
                            </span>
                          </td>
                          <td className="py-4 px-4 text-sm">
                            <button className="bg-emerald-600 text-white px-3 py-1 rounded hover:bg-emerald-700 transition mr-2">
                              Assign Supervisor
                            </button>
                            <button className="text-blue-600 hover:text-blue-800 font-medium">
                              View Details
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-md mb-6 p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Co-Supervisor Assignment</h2>
                <div className="flex flex-col md:flex-row md:space-x-4 mb-4">
                  <div className="mb-4 md:mb-0 md:w-1/2">
                    <h3 className="text-md font-medium text-gray-700 mb-2">Willingness Forms</h3>
                    <div className="border border-gray-200 rounded-lg p-4 h-48 overflow-y-auto">
                      <div className="flex justify-between items-center p-3 border-b border-gray-100">
                        <div>
                          <p className="font-medium">Dr. Amit Kumar</p>
                          <p className="text-sm text-gray-500">Chemistry - External</p>
                        </div>
                        <div>
                          <button className="text-green-600 hover:text-green-800 font-medium mr-2">Approve</button>
                          <button className="text-red-600 hover:text-red-800 font-medium">Reject</button>
                        </div>
                      </div>
                      <div className="flex justify-between items-center p-3 border-b border-gray-100">
                        <div>
                          <p className="font-medium">Dr. Sneha Patel</p>
                          <p className="text-sm text-gray-500">Physics - Internal</p>
                        </div>
                        <div>
                          <button className="text-green-600 hover:text-green-800 font-medium mr-2">Approve</button>
                          <button className="text-red-600 hover:text-red-800 font-medium">Reject</button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="md:w-1/2">
                    <h3 className="text-md font-medium text-gray-700 mb-2">Approved Co-Supervisors</h3>
                    <div className="border border-gray-200 rounded-lg p-4 h-48 overflow-y-auto">
                      <div className="flex justify-between items-center p-3 border-b border-gray-100">
                        <div>
                          <p className="font-medium">Dr. Rajesh Agarwal</p>
                          <p className="text-sm text-gray-500">Computer Science - External</p>
                        </div>
                        <button className="text-blue-600 hover:text-blue-800 font-medium">Assign Students</button>
                      </div>
                      <div className="flex justify-between items-center p-3 border-b border-gray-100">
                        <div>
                          <p className="font-medium">Dr. Meera Sharma</p>
                          <p className="text-sm text-gray-500">Biotechnology - Internal</p>
                        </div>
                        <button className="text-blue-600 hover:text-blue-800 font-medium">Assign Students</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* DSC Formation Tab */}
          {activeTab === 'dsc' && (
            <div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <div className="bg-white rounded-xl shadow-md mb-6 p-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Pending DSC Formations</h2>
                    <div className="overflow-x-auto">
                      <table className="min-w-full bg-white">
                        <thead>
                          <tr className="bg-gray-50">
                            <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                            <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Scholar</th>
                            <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                            <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Supervisor</th>
                            <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {mockDscFormations.map((student) => (
                            <tr key={student.id} className="hover:bg-gray-50">
                              <td className="py-4 px-4 text-sm text-gray-900">{student.id}</td>
                              <td className="py-4 px-4 text-sm text-gray-900">{student.name}</td>
                              <td className="py-4 px-4 text-sm text-gray-900">{student.department}</td>
                              <td className="py-4 px-4 text-sm text-gray-900">{student.supervisor}</td>
                              <td className="py-4 px-4 text-sm">
                                <button className="bg-purple-600 text-white px-3 py-1 rounded hover:bg-purple-700 transition mr-2">
                                  Form DSC
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                
                <div>
                  <div className="bg-white rounded-xl shadow-md mb-6 p-6">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">Create DSC</h2>
                    <form>
                      <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-medium mb-2">
                          Student ID
                        </label>
                        <input 
                          type="text" 
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                          placeholder="Enter Student ID"
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-medium mb-2">
                          DSC Chair
                        </label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500">
                          <option value="">Select DSC Chair</option>
                          <option value="1">Dr. Rajiv Kumar</option>
                          <option value="2">Dr. Preeti Sharma</option>
                          <option value="3">Dr. Vijay Singh</option>
                        </select>
                      </div>
                      <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-medium mb-2">
                          Member 1
                        </label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500">
                          <option value="">Select Member</option>
                          <option value="1">Dr. Anil Gupta</option>
                          <option value="2">Dr. Suman Das</option>
                          <option value="3">Dr. Rakesh Mishra</option>
                        </select>
                      </div>
                      <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-medium mb-2">
                          Member 2
                        </label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500">
                          <option value="">Select Member</option>
                          <option value="1">Dr. Pooja Verma</option>
                          <option value="2">Dr. Samir Khan</option>
                          <option value="3">Dr. Nisha Patel</option>
                        </select>
                      </div>
                      <button 
                        type="submit"
                        className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-md transition"
                      >
                        Create DSC
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Pre-Submission & Final Approvals Tab */}
          {activeTab === 'pre-submission' && (
            <div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <div className="bg-white rounded-xl shadow-md p-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">Pre-Submission Requests</h2>
                  <div className="space-y-4">
                    <div className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">Ankit Joshi (PHD2022010)</p>
                          <p className="text-sm text-gray-500">Computer Science</p>
                          <p className="text-xs text-gray-400 mt-1">Submitted: 2023-05-05</p>
                        </div>
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                          Pending Approval
                        </span>
                      </div>
                      <div className="flex mt-3 space-x-2">
                        <button className="text-blue-600 hover:text-blue-800 font-medium text-sm">View Documents</button>
                        <button className="text-green-600 hover:text-green-800 font-medium text-sm">Approve</button>
                        <button className="text-red-600 hover:text-red-800 font-medium text-sm">Reject</button>
                      </div>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">Meera Shah (PHD2022009)</p>
                          <p className="text-sm text-gray-500">Physics</p>
                          <p className="text-xs text-gray-400 mt-1">Submitted: 2023-05-02</p>
                        </div>
                        <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">
                          DSC Review
                        </span>
                      </div>
                      <div className="flex mt-3 space-x-2">
                        <button className="text-blue-600 hover:text-blue-800 font-medium text-sm">View Documents</button>
                        <button className="text-gray-600 hover:text-gray-800 font-medium text-sm">Track Progress</button>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl shadow-md p-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">Final Thesis Submissions</h2>
                  <div className="space-y-4">
                    <div className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">Kiran Kumar (PHD2022001)</p>
                          <p className="text-sm text-gray-500">Biotechnology</p>
                          <p className="text-xs text-gray-400 mt-1">Submitted: 2023-04-28</p>
                        </div>
                        <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                          Ready for Viva
                        </span>
                      </div>
                      <div className="flex mt-3 space-x-2">
                        <button className="text-blue-600 hover:text-blue-800 font-medium text-sm">View Thesis</button>
                        <button className="text-purple-600 hover:text-purple-800 font-medium text-sm">Schedule Viva</button>
                      </div>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">Nisha Verma (PHD2022003)</p>
                          <p className="text-sm text-gray-500">Mathematics</p>
                          <p className="text-xs text-gray-400 mt-1">Submitted: 2023-04-15</p>
                        </div>
                        <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-medium">
                          External Evaluation
                        </span>
                      </div>
                      <div className="flex mt-3 space-x-2">
                        <button className="text-blue-600 hover:text-blue-800 font-medium text-sm">View Thesis</button>
                        <button className="text-gray-600 hover:text-gray-800 font-medium text-sm">Track Evaluations</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Viva Voce Schedule</h2>
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                        <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Scholar</th>
                        <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                        <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
                        <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Venue</th>
                        <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr className="hover:bg-gray-50">
                        <td className="py-3 px-4 text-sm text-gray-900">PHD2022001</td>
                        <td className="py-3 px-4 text-sm text-gray-900">Kiran Kumar</td>
                        <td className="py-3 px-4 text-sm text-gray-900">Biotechnology</td>
                        <td className="py-3 px-4 text-sm text-gray-900">May 15, 2023, 10:00 AM</td>
                        <td className="py-3 px-4 text-sm text-gray-900">Conference Hall B</td>
                        <td className="py-3 px-4 text-sm">
                          <button className="text-blue-600 hover:text-blue-800 font-medium mr-2">View Details</button>
                          <button className="text-green-600 hover:text-green-800 font-medium">Edit</button>
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="py-3 px-4 text-sm text-gray-900">PHD2021008</td>
                        <td className="py-3 px-4 text-sm text-gray-900">Sanjay Singh</td>
                        <td className="py-3 px-4 text-sm text-gray-900">Chemistry</td>
                        <td className="py-3 px-4 text-sm text-gray-900">May 18, 2023, 2:00 PM</td>
                        <td className="py-3 px-4 text-sm text-gray-900">Science Block, Room 304</td>
                        <td className="py-3 px-4 text-sm">
                          <button className="text-blue-600 hover:text-blue-800 font-medium mr-2">View Details</button>
                          <button className="text-green-600 hover:text-green-800 font-medium">Edit</button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Full Records Tab */}
          {activeTab === 'records' && (
            <div>
              <div className="bg-white rounded-xl shadow-md p-6 mb-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-800">Complete Scholar Records</h2>
                  <div className="mt-4 md:mt-0 flex flex-wrap gap-2">
                    <div className="relative">
                      <input 
                        type="text" 
                        placeholder="Search by name or ID..." 
                        className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      />
                      <svg className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                    <select className="border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent">
                      <option value="">All Departments</option>
                      <option value="cs">Computer Science</option>
                      <option value="ee">Electrical Engineering</option>
                      <option value="me">Mechanical Engineering</option>
                      <option value="ce">Civil Engineering</option>
                    </select>
                    <select className="border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent">
                      <option value="">All Status</option>
                      <option value="application">Application</option>
                      <option value="supervisor">Supervisor Allocation</option>
                      <option value="dsc">DSC Formation</option>
                      <option value="progress">In Progress</option>
                      <option value="pre-submission">Pre-Submission</option>
                      <option value="thesis">Thesis Submitted</option>
                      <option value="completed">Completed</option>
                    </select>
                    <button className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg shadow-sm transition">
                      Apply Filters
                    </button>
                  </div>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                        <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                        <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                        <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Supervisor</th>
                        <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current Stage</th>
                        <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Start Date</th>
                        <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr className="hover:bg-gray-50">
                        <td className="py-3 px-4 text-sm text-gray-900">PHD2022001</td>
                        <td className="py-3 px-4 text-sm text-gray-900">Kiran Kumar</td>
                        <td className="py-3 px-4 text-sm text-gray-900">Biotechnology</td>
                        <td className="py-3 px-4 text-sm text-gray-900">Dr. Sunita Verma</td>
                        <td className="py-3 px-4 text-sm">
                          <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Ready for Viva
                          </span>
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-900">Jan 15, 2022</td>
                        <td className="py-3 px-4 text-sm">
                          <button className="text-blue-600 hover:text-blue-800 font-medium mr-2">View Profile</button>
                          <button className="text-purple-600 hover:text-purple-800 font-medium">Full History</button>
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="py-3 px-4 text-sm text-gray-900">PHD2022003</td>
                        <td className="py-3 px-4 text-sm text-gray-900">Nisha Verma</td>
                        <td className="py-3 px-4 text-sm text-gray-900">Mathematics</td>
                        <td className="py-3 px-4 text-sm text-gray-900">Dr. Ramesh Shah</td>
                        <td className="py-3 px-4 text-sm">
                          <span className="px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                            External Evaluation
                          </span>
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-900">Feb 10, 2022</td>
                        <td className="py-3 px-4 text-sm">
                          <button className="text-blue-600 hover:text-blue-800 font-medium mr-2">View Profile</button>
                          <button className="text-purple-600 hover:text-purple-800 font-medium">Full History</button>
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="py-3 px-4 text-sm text-gray-900">PHD2022009</td>
                        <td className="py-3 px-4 text-sm text-gray-900">Meera Shah</td>
                        <td className="py-3 px-4 text-sm text-gray-900">Physics</td>
                        <td className="py-3 px-4 text-sm text-gray-900">Dr. Anand Mishra</td>
                        <td className="py-3 px-4 text-sm">
                          <span className="px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                            DSC Review
                          </span>
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-900">Jun 20, 2022</td>
                        <td className="py-3 px-4 text-sm">
                          <button className="text-blue-600 hover:text-blue-800 font-medium mr-2">View Profile</button>
                          <button className="text-purple-600 hover:text-purple-800 font-medium">Full History</button>
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="py-3 px-4 text-sm text-gray-900">PHD2022010</td>
                        <td className="py-3 px-4 text-sm text-gray-900">Ankit Joshi</td>
                        <td className="py-3 px-4 text-sm text-gray-900">Computer Science</td>
                        <td className="py-3 px-4 text-sm text-gray-900">Dr. Rajiv Kumar</td>
                        <td className="py-3 px-4 text-sm">
                          <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            Pre-submission
                          </span>
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-900">Jul 05, 2022</td>
                        <td className="py-3 px-4 text-sm">
                          <button className="text-blue-600 hover:text-blue-800 font-medium mr-2">View Profile</button>
                          <button className="text-purple-600 hover:text-purple-800 font-medium">Full History</button>
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="py-3 px-4 text-sm text-gray-900">PHD2023001</td>
                        <td className="py-3 px-4 text-sm text-gray-900">Ananya Sharma</td>
                        <td className="py-3 px-4 text-sm text-gray-900">Computer Science</td>
                        <td className="py-3 px-4 text-sm text-gray-900">Pending</td>
                        <td className="py-3 px-4 text-sm">
                          <span className="px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                            Pending Review
                          </span>
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-900">May 10, 2023</td>
                        <td className="py-3 px-4 text-sm">
                          <button className="text-blue-600 hover:text-blue-800 font-medium mr-2">View Profile</button>
                          <button className="text-purple-600 hover:text-purple-800 font-medium">Full History</button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                
                <div className="mt-4 flex justify-between items-center">
                  <div className="text-sm text-gray-500">
                    Showing <span className="font-medium">1</span> to <span className="font-medium">5</span> of <span className="font-medium">12</span> results
                  </div>
                  <div className="flex space-x-2">
                    <button className="px-3 py-1 border border-gray-300 rounded-md bg-white text-gray-500 hover:bg-gray-50">
                      Previous
                    </button>
                    <button className="px-3 py-1 border border-gray-300 rounded-md bg-amber-600 text-white hover:bg-amber-700">
                      1
                    </button>
                    <button className="px-3 py-1 border border-gray-300 rounded-md bg-white text-gray-500 hover:bg-gray-50">
                      2
                    </button>
                    <button className="px-3 py-1 border border-gray-300 rounded-md bg-white text-gray-500 hover:bg-gray-50">
                      3
                    </button>
                    <button className="px-3 py-1 border border-gray-300 rounded-md bg-white text-gray-500 hover:bg-gray-50">
                      Next
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Analytics & Reports</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h3 className="font-medium text-gray-700 mb-3">Department-wise Applications</h3>
                    <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
                      {/* Chart placeholder */}
                      <p className="text-gray-500">Department Distribution Chart</p>
                    </div>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h3 className="font-medium text-gray-700 mb-3">Status Distribution</h3>
                    <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
                      {/* Chart placeholder */}
                      <p className="text-gray-500">Status Distribution Chart</p>
                    </div>
                  </div>
                </div>
                <div className="mt-6 flex justify-end">
                  <button className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg shadow-sm transition mr-2">
                    Generate Full Report
                  </button>
                  <button className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg shadow-sm transition">
                    Export Data
                  </button>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>

      {/* Footer Component */}
      <Footer />
    </div>
  );
}