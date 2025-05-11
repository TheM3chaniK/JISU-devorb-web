/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unused-vars */

"use client";
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Define types for our data models
interface ProgressReport {
  id: number;
  title: string;
  status: string;
  date: string;
}

interface Scholar {
  id: number;
  name: string;
  department: string;
  enrollmentNo: string;
  status: string;
  progressReports: ProgressReport[];
}

interface PendingApproval {
  id: number;
  scholarName: string;
  documentType: string;
  submittedDate: string;
  urgency: string;
}

// Mock data for assigned scholars
const mockScholars: Scholar[] = [
  {
    id: 1,
    name: "Rahul Sharma",
    department: "Computer Science",
    enrollmentNo: "PHD-CS-2023-001",
    status: "Progress Report 3 Pending",
    progressReports: [
      { id: 1, title: "Progress Report 1", status: "Approved", date: "15 Jan 2025" },
      { id: 2, title: "Progress Report 2", status: "Approved", date: "20 Mar 2025" },
      { id: 3, title: "Progress Report 3", status: "Pending Review", date: "12 May 2025" },
    ]
  },
  {
    id: 2,
    name: "Priya Patel",
    department: "Electrical Engineering",
    enrollmentNo: "PHD-EE-2023-005",
    status: "Pre-submission Stage",
    progressReports: [
      { id: 1, title: "Progress Report 1", status: "Approved", date: "10 Jan 2025" },
      { id: 2, title: "Progress Report 2", status: "Approved", date: "05 Mar 2025" },
      { id: 3, title: "Progress Report 3", status: "Approved", date: "08 May 2025" },
      { id: 4, title: "Progress Report 4", status: "Approved", date: "12 Jul 2025" },
      { id: 5, title: "Progress Report 5", status: "Approved", date: "18 Sep 2025" },
      { id: 6, title: "Progress Report 6", status: "Approved", date: "22 Nov 2025" },
      { id: 7, title: "Pre-submission", status: "Pending Review", date: "01 May 2025" },
    ]
  },
  {
    id: 3,
    name: "Amit Kumar",
    department: "Mathematics",
    enrollmentNo: "PHD-MTH-2024-003",
    status: "Research Proposal Pending",
    progressReports: [
      { id: 1, title: "Research Proposal", status: "Pending Review", date: "05 May 2025" },
    ]
  }
];

// Mock data for pending approvals
const mockPendingApprovals: PendingApproval[] = [
  {
    id: 1,
    scholarName: "Rahul Sharma",
    documentType: "Progress Report 3",
    submittedDate: "12 May 2025",
    urgency: "high"
  },
  {
    id: 2,
    scholarName: "Priya Patel",
    documentType: "Pre-submission Write-up",
    submittedDate: "01 May 2025",
    urgency: "medium"
  },
  {
    id: 3,
    scholarName: "Amit Kumar",
    documentType: "Research Proposal",
    submittedDate: "05 May 2025",
    urgency: "high"
  }
];

export default function SupervisorDashboard() {
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState('scholars');
  const [selectedScholar, setSelectedScholar] = useState<Scholar | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Animation variants
  const itemVariant = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  if (!mounted) return null;

  const handleScholarSelect = (scholar: Scholar) => {
    setSelectedScholar(scholar);
    setActiveTab('scholarDetails');
  };

  const renderDashboardContent = () => {
    switch (activeTab) {
      case 'scholars':
        return (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Assigned Ph.D. Scholars</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Enrollment No.</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {mockScholars.map((scholar) => (
                    <tr key={scholar.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-gray-900">{scholar.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {scholar.department}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {scholar.enrollmentNo}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          scholar.status.includes('Pending') ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                        }`}>
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
                </tbody>
              </table>
            </div>
          </div>
        );

      case 'approvals':
        return (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Pending Approvals</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {mockPendingApprovals.map((approval) => (
                <div 
                  key={approval.id} 
                  className={`border ${
                    approval.urgency === 'high' ? 'border-red-200 bg-red-50' : 
                    approval.urgency === 'medium' ? 'border-yellow-200 bg-yellow-50' : 
                    'border-blue-200 bg-blue-50'
                  } rounded-lg p-4 shadow-sm`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold text-gray-800">{approval.documentType}</h4>
                      <p className="text-sm text-gray-600">Scholar: {approval.scholarName}</p>
                      <p className="text-xs text-gray-500 mt-1">Submitted: {approval.submittedDate}</p>
                    </div>
                    {approval.urgency === 'high' && (
                      <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full font-medium">Urgent</span>
                    )}
                  </div>
                  <div className="mt-4 flex gap-2">
                    <button className="bg-emerald-600 hover:bg-emerald-700 text-white text-sm px-3 py-1 rounded-md transition-colors">
                      Review
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'repository':
        return (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Approved Documents Repository</h3>
            <div className="mb-4">
              <input 
                type="text" 
                placeholder="Search documents..." 
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>
            
            <div className="flex flex-col space-y-4">
              <div className="border-b pb-2">
                <h4 className="font-medium text-gray-700">Research Proposals</h4>
                <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-2">
                  <div className="flex items-center p-2 border rounded-md hover:bg-gray-50">
                    <svg className="h-5 w-5 text-gray-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"></path>
                    </svg>
                    <div className="flex-1">
                      <div className="text-sm font-medium">ML-Based Fraud Detection</div>
                      <div className="text-xs text-gray-500">Rahul Sharma - Approved on 10 Dec 2024</div>
                    </div>
                    <button className="text-emerald-600 hover:text-emerald-800 p-1">
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                    </button>
                  </div>
                  <div className="flex items-center p-2 border rounded-md hover:bg-gray-50">
                    <svg className="h-5 w-5 text-gray-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"></path>
                    </svg>
                    <div className="flex-1">
                      <div className="text-sm font-medium">Smart Grid Optimization</div>
                      <div className="text-xs text-gray-500">Priya Patel - Approved on 05 Nov 2024</div>
                    </div>
                    <button className="text-emerald-600 hover:text-emerald-800 p-1">
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              <div className="border-b pb-2">
                <h4 className="font-medium text-gray-700">Progress Reports</h4>
                <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-2">
                  {[1, 2, 3, 4].map((num) => (
                    <div key={num} className="flex items-center p-2 border rounded-md hover:bg-gray-50">
                      <svg className="h-5 w-5 text-gray-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"></path>
                      </svg>
                      <div className="flex-1">
                        <div className="text-sm font-medium">Progress Report {num} - Priya Patel</div>
                        <div className="text-xs text-gray-500">Approved on {num * 2} {num % 2 === 0 ? 'Mar' : 'Apr'} 2025</div>
                      </div>
                      <button className="text-emerald-600 hover:text-emerald-800 p-1">
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-700">Pre-submission & Thesis</h4>
                <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-2">
                  <div className="flex items-center p-2 border rounded-md hover:bg-gray-50">
                    <svg className="h-5 w-5 text-gray-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"></path>
                    </svg>
                    <div className="flex-1">
                      <div className="text-sm font-medium">Pre-submission Write-up</div>
                      <div className="text-xs text-gray-500">Suresh Das - Approved on 15 Jan 2025</div>
                    </div>
                    <button className="text-emerald-600 hover:text-emerald-800 p-1">
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'scholarDetails':
        if (!selectedScholar) return null;
        
        return (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-800">Scholar Details</h3>
              <button 
                onClick={() => setActiveTab('scholars')} 
                className="text-sm text-emerald-600 hover:text-emerald-800 flex items-center"
              >
                <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to List
              </button>
            </div>

            <div className="bg-emerald-50 border border-emerald-100 rounded-lg p-4 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Name</p>
                  <p className="font-medium">{selectedScholar.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Department</p>
                  <p className="font-medium">{selectedScholar.department}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Enrollment Number</p>
                  <p className="font-medium">{selectedScholar.enrollmentNo}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Current Status</p>
                  <p className="font-medium">{selectedScholar.status}</p>
                </div>
              </div>
            </div>

            <h4 className="font-semibold text-gray-700 mb-3">Progress Reports & Submissions</h4>
            <div className="space-y-4">
              {selectedScholar.progressReports.map((report) => (
                <div key={report.id} className="flex items-center border-b pb-3">
                  <div className={`h-8 w-8 rounded-full flex items-center justify-center mr-3 ${
                    report.status === 'Approved' 
                      ? 'bg-green-100 text-green-600' 
                      : report.status === 'Pending Review'
                      ? 'bg-yellow-100 text-yellow-600'
                      : 'bg-red-100 text-red-600'
                  }`}>
                    {report.status === 'Approved' ? (
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : report.status === 'Pending Review' ? (
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    ) : (
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <div>
                        <p className="font-medium">{report.title}</p>
                        <p className="text-xs text-gray-500">Submitted: {report.date}</p>
                      </div>
                      <div>
                        <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                          report.status === 'Approved' 
                            ? 'bg-green-100 text-green-800' 
                            : report.status === 'Pending Review'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {report.status}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {report.status === 'Pending Review' && (
                    <div className="ml-4 flex gap-2">
                      <button className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs px-3 py-1 rounded transition-colors">
                        Review
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {selectedScholar.progressReports.some(r => r.status === 'Pending Review') && (
              <div className="mt-6 bg-yellow-50 border border-yellow-100 rounded-lg p-4">
                <h4 className="font-medium text-yellow-800 mb-2">Actions Required</h4>
                <ul className="list-disc list-inside text-sm text-yellow-700">
                  {selectedScholar.progressReports
                    .filter(r => r.status === 'Pending Review')
                    .map(report => (
                      <li key={report.id}>Review and approve {report.title}</li>
                    ))}
                </ul>
              </div>
            )}
          </div>
        );

      case 'push':
        return (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Push to DSC</h3>
            <p className="text-gray-600 mb-6">Documents approved by both supervisor and co-supervisor can be forwarded to DSC for further review.</p>
            
            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-6">
              <div className="flex items-center">
                <svg className="h-5 w-5 text-emerald-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-sm text-emerald-800">Only documents with both supervisor and co-supervisor approval can be pushed to DSC.</p>
              </div>
            </div>
            
            <h4 className="font-medium text-gray-700 mb-3">Ready for DSC Submission</h4>
            <div className="space-y-4 mb-6">
              <div className="border rounded-lg p-4 hover:bg-gray-50">
                <div className="flex justify-between items-center">
                  <div>
                    <h5 className="font-medium">Research Proposal - Neeta Gupta</h5>
                    <p className="text-sm text-gray-500">Approved by Co-supervisor on 01 May 2025</p>
                  </div>
                  <button className="bg-emerald-600 hover:bg-emerald-700 text-white text-sm px-4 py-2 rounded transition-colors">
                    Forward to DSC
                  </button>
                </div>
              </div>
              
              <div className="border rounded-lg p-4 hover:bg-gray-50">
                <div className="flex justify-between items-center">
                  <div>
                    <h5 className="font-medium">Progress Report 5 - Priya Patel</h5>
                    <p className="text-sm text-gray-500">Approved by Co-supervisor on 28 Apr 2025</p>
                  </div>
                  <button className="bg-emerald-600 hover:bg-emerald-700 text-white text-sm px-4 py-2 rounded transition-colors">
                    Forward to DSC
                  </button>
                </div>
              </div>
            </div>
            
            <h4 className="font-medium text-gray-700 mb-3">Awaiting Co-Supervisor Approval</h4>
            <div className="space-y-4">
              <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                <div className="flex justify-between items-center">
                  <div>
                    <h5 className="font-medium">Pre-submission Write-up - Suresh Das</h5>
                    <p className="text-sm text-gray-500">Pending Co-supervisor approval</p>
                  </div>
                  <button className="bg-gray-300 text-gray-600 text-sm px-4 py-2 rounded cursor-not-allowed">
                    Awaiting Approval
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const renderNotifications = () => (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-3">Notifications</h3>
      <div className="space-y-3">
        <div className="flex items-start gap-3 p-2 border-b">
          <div className="h-8 w-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
            <svg className="h-4 w-4 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-medium">Urgent: 3 submissions awaiting your review</p>
            <p className="text-xs text-gray-500">Today</p>
          </div>
        </div>
        
        <div className="flex items-start gap-3 p-2 border-b">
          <div className="h-8 w-8 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
            <svg className="h-4 w-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-medium">DSC approved thesis for Vijay Malhotra</p>
            <p className="text-xs text-gray-500">Yesterday</p>
          </div>
        </div>
        
        <div className="flex items-start gap-3 p-2">
          <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
            <svg className="h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-medium">DSC meeting scheduled for next week</p>
            <p className="text-xs text-gray-500">2 days ago</p>
          </div>
        </div>
      </div>
      
      <button className="mt-3 text-emerald-600 hover:text-emerald-800 text-sm font-medium">
        View all notifications
      </button>
    </div>
  );


  const renderStats = () => (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <div className="bg-white rounded-xl shadow-sm p-4 border-l-4 border-emerald-500">
        <p className="text-sm text-gray-500">Assigned Scholars</p>
        <p className="text-2xl font-bold text-gray-800">8</p>
      </div>
      <div className="bg-white rounded-xl shadow-sm p-4 border-l-4 border-yellow-500">
        <p className="text-sm text-gray-500">Pending Approvals</p>
        <p className="text-2xl font-bold text-gray-800">3</p>
      </div>
      <div className="bg-white rounded-xl shadow-sm p-4 border-l-4 border-blue-500">
        <p className="text-sm text-gray-500">Pre-submission Stage</p>
        <p className="text-2xl font-bold text-gray-800">1</p>
      </div>
      <div className="bg-white rounded-xl shadow-sm p-4 border-l-4 border-purple-500">
        <p className="text-sm text-gray-500">Thesis Submissions</p>
        <p className="text-2xl font-bold text-gray-800">2</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-emerald-700 text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Supervisor Dashboard</h1>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <button className="p-1 rounded-full hover:bg-emerald-600 focus:outline-none">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                </button>
                <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
              </div>
              <div className="flex items-center">
                <img className="h-8 w-8 rounded-full" src="/api/placeholder/32/32" alt="User" />
                <span className="ml-2 font-medium">Dr. Rajesh Gupta</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {renderStats()}
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <div className="bg-white rounded-xl shadow-lg p-4 mb-6">
                <div className="flex items-center space-x-2 mb-4">
                  <button 
                    onClick={() => setActiveTab('scholars')} 
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      activeTab === 'scholars' 
                        ? 'bg-emerald-600 text-white' 
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    Scholars
                  </button>
                  <button 
                    onClick={() => setActiveTab('approvals')} 
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      activeTab === 'approvals' 
                        ? 'bg-emerald-600 text-white' 
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    Pending Approvals
                  </button>
                  <button 
                    onClick={() => setActiveTab('repository')} 
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      activeTab === 'repository' 
                        ? 'bg-emerald-600 text-white' 
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    Repository
                  </button>
                  <button 
                    onClick={() => setActiveTab('push')} 
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      activeTab === 'push' 
                        ? 'bg-emerald-600 text-white' 
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    Push to DSC
                  </button>
                </div>
                
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {renderDashboardContent()}
                </motion.div>
              </div>
            </div>
            
            <div className="md:col-span-1">
              {renderNotifications()}
              
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Upcoming DSC Meetings</h3>
                <div className="space-y-4">
                  <div className="border-l-4 border-emerald-500 pl-3">
                    <p className="font-medium">Progress Report Evaluation</p>
                    <p className="text-sm text-gray-500">20 May 2025, 10:00 AM</p>
                    <p className="text-xs mt-1">Scholars: Rahul Sharma, Priya Patel</p>
                  </div>
                  <div className="border-l-4 border-emerald-500 pl-3">
                    <p className="font-medium">Pre-submission Seminar</p>
                    <p className="text-sm text-gray-500">25 May 2025, 02:00 PM</p>
                    <p className="text-xs mt-1">Scholar: Priya Patel</p>
                  </div>
                  <div className="border-l-4 border-emerald-500 pl-3">
                    <p className="font-medium">Research Proposal Review</p>
                    <p className="text-sm text-gray-500">28 May 2025, 11:30 AM</p>
                    <p className="text-xs mt-1">Scholar: Amit Kumar</p>
                  </div>
                </div>
                <button className="mt-4 text-sm text-emerald-600 hover:text-emerald-800 font-medium">
                  View all scheduled meetings
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}