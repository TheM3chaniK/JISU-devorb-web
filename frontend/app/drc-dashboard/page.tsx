"use client";
import { ReactNode, useState } from 'react';

// Mock data - simplified for the essential functions
const mockApplications = [
  { id: 'PHD2023001', name: 'Ananya Sharma', department: 'Computer Science', submissionDate: '2023-05-10', documents: 4 },
  { id: 'PHD2023002', name: 'Rahul Gupta', department: 'Electrical Engineering', submissionDate: '2023-05-08', documents: 3 },
  { id: 'PHD2023003', name: 'Priya Patel', department: 'Mechanical Engineering', submissionDate: '2023-05-01', documents: 5 },
];

const mockApprovedStudents = [
  { id: 'PHD2023005', name: 'Deepak Kumar', department: 'Physics', submissionDate: '2023-05-03' },
  { id: 'PHD2023006', name: 'Kavita Mishra', department: 'Chemistry', submissionDate: '2023-05-04' },
];

const mockCoSupervisorRequests = [
  { id: 'COS2023001', studentName: 'Vikram Singh', department: 'Civil Engineering', professorName: 'Dr. Amit Kumar', date: '2023-05-12' },
  { id: 'COS2023002', studentName: 'Meera Shah', department: 'Physics', professorName: 'Dr. Sneha Patel', date: '2023-05-11' },
];

const mockThesisSubmissions = [
  { id: 'PHD2022001', name: 'Kiran Kumar', department: 'Biotechnology', submissionDate: '2023-04-28', supervisor: 'Dr. Sunita Verma' },
  { id: 'PHD2022003', name: 'Nisha Verma', department: 'Mathematics', submissionDate: '2023-04-15', supervisor: 'Dr. Ramesh Shah' },
];

interface DashboardHeaderProps {
  title: string;
  subtitle: string;
}

interface TabButtonProps {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}

interface ActionButtonProps {
  color?: 'amber' | 'green' | 'red' | 'blue' | 'gray';
  onClick: () => void;
  children: ReactNode;
}

interface CardProps {
  children: ReactNode;
}

interface EmailInputProps {
  label: string;
  placeholder: string;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ title, subtitle }) => (
  <div className="mb-4">
    <h2 className="text-2xl font-bold text-black">{title}</h2>
    <p className="text-black">{subtitle}</p>
  </div>
);

const TabButton: React.FC<TabButtonProps> = ({ active, onClick, children }) => (
  <button 
    className={`px-4 py-2 font-medium rounded-t-lg ${
      active ? 'bg-white text-amber-600 border-t border-l border-r border-gray-200' : 'bg-gray-100 text-black hover:bg-gray-200'
    }`}
    onClick={onClick}
  >
    {children}
  </button>
);

const ActionButton: React.FC<ActionButtonProps> = ({ color = "amber", onClick, children }) => {
  const colorClasses: Record<string, string> = {
    amber: "bg-amber-600 hover:bg-amber-700 text-white",
    green: "bg-green-600 hover:bg-green-700 text-white",
    red: "bg-red-600 hover:bg-red-700 text-white",
    blue: "bg-blue-600 hover:bg-blue-700 text-white",
    gray: "bg-gray-200 hover:bg-gray-300 text-black"
  };
  
  return (
    <button 
      className={`px-3 py-1 rounded-md ${colorClasses[color]} transition-colors duration-200`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

const Card: React.FC<CardProps> = ({ children }) => (
  <div className="bg-white rounded-lg shadow-md p-6 mb-6">
    {children}
  </div>
);

const EmailInput: React.FC<EmailInputProps> = ({ label, placeholder }) => (
  <div className="mb-4">
    <label className="block text-black text-sm font-medium mb-2">{label}</label>
    <input 
      type="email" 
      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
      placeholder={placeholder}
    />
  </div>
);

export {
  DashboardHeader,
  TabButton,
  ActionButton,
  Card,
  EmailInput
};

export default function DRCDashboard() {
  const [activeTab, setActiveTab] = useState('applications');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-black">DRC Dashboard</h1>
              <p className="text-black">Doctoral Research Committee Management System</p>
            </div>
            <div className="flex space-x-2">
              <ActionButton color="gray" onClick={() => console.log("Generating reports...")}>Generate Reports</ActionButton>
              <ActionButton onClick={() => console.log("Downloading records...")}>Download Records</ActionButton>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        {/* Tab Navigation */}
        <div className="flex space-x-1 mb-6">
          <TabButton 
            active={activeTab === 'applications'} 
            onClick={() => setActiveTab('applications')}
          >
            Student Applications
          </TabButton>
          <TabButton 
            active={activeTab === 'supervisors'} 
            onClick={() => setActiveTab('supervisors')}
          >
            Supervisor Allocation
          </TabButton>
          <TabButton 
            active={activeTab === 'dsc'} 
            onClick={() => setActiveTab('dsc')}
          >
            DSC Formation
          </TabButton>
          <TabButton 
            active={activeTab === 'cosupervisors'} 
            onClick={() => setActiveTab('cosupervisors')}
          >
            Co-Supervisor Requests
          </TabButton>
          <TabButton 
            active={activeTab === 'thesis'} 
            onClick={() => setActiveTab('thesis')}
          >
            Thesis Approvals
          </TabButton>
          <TabButton 
            active={activeTab === 'records'} 
            onClick={() => setActiveTab('records')}
          >
            Records
          </TabButton>
        </div>

        {/* Tab Content */}
        {activeTab === 'applications' && (
          <Card>
            <DashboardHeader 
              title="Student Application Approvals" 
              subtitle="Review and approve/reject student applications" 
            />
            
            <div className="mb-4 flex justify-between">
              <div className="relative w-64">
                <input 
                  type="text" 
                  placeholder="Search applications..." 
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
                <svg className="h-5 w-5 text-black absolute left-3 top-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <select className="border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-amber-500">
                <option value="">All Departments</option>
                <option value="cs">Computer Science</option>
                <option value="ee">Electrical Engineering</option>
                <option value="me">Mechanical Engineering</option>
              </select>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="py-2 px-4 border-b text-left">ID</th>
                    <th className="py-2 px-4 border-b text-left">Name</th>
                    <th className="py-2 px-4 border-b text-left">Department</th>
                    <th className="py-2 px-4 border-b text-left">Date</th>
                    <th className="py-2 px-4 border-b text-left">Documents</th>
                    <th className="py-2 px-4 border-b text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {mockApplications.map((app) => (
                    <tr key={app.id} className="hover:bg-gray-50">
                      <td className="py-3 px-4 border-b">{app.id}</td>
                      <td className="py-3 px-4 border-b">{app.name}</td>
                      <td className="py-3 px-4 border-b">{app.department}</td>
                      <td className="py-3 px-4 border-b">{app.submissionDate}</td>
                      <td className="py-3 px-4 border-b">
                        <button className="text-blue-600 hover:underline">{app.documents} Files</button>
                      </td>
                      <td className="py-3 px-4 border-b">
                        <div className="flex space-x-2">
                          <ActionButton color="green" onClick={() => console.log("Approving...")}>Approve</ActionButton>
                          <ActionButton color="red" onClick={() => console.log("Rejecting...")}>Reject</ActionButton>

                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}

        {activeTab === 'supervisors' && (
          <Card>
            <DashboardHeader 
              title="Supervisor Allocation" 
              subtitle="Assign supervisors to approved students" 
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-medium text-lg mb-4">Approved Students</h3>
                <div className="overflow-y-auto max-h-80">
                  <table className="min-w-full bg-white border border-gray-200">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="py-2 px-4 border-b text-left">ID</th>
                        <th className="py-2 px-4 border-b text-left">Name</th>
                        <th className="py-2 px-4 border-b text-left">Department</th>
                        <th className="py-2 px-4 border-b text-left">Select</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockApprovedStudents.map((student) => (
                        <tr key={student.id} className="hover:bg-gray-50">
                          <td className="py-2 px-4 border-b">{student.id}</td>
                          <td className="py-2 px-4 border-b">{student.name}</td>
                          <td className="py-2 px-4 border-b">{student.department}</td>
                          <td className="py-2 px-4 border-b">
                            <input type="radio" name="selectedStudent" />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-medium text-lg mb-4">Assign Supervisor</h3>
                <form>
                  <EmailInput 
                    label="Supervisor Email" 
                    placeholder="Enter supervisor's email address" 
                  />
                  <div className="mt-4">
                    <ActionButton onClick={() => console.log("Assigning supervisor...")}>Assign Supervisor</ActionButton>
                  </div>
                </form>
              </div>
            </div>
          </Card>
        )}

        {activeTab === 'dsc' && (
          <Card>
            <DashboardHeader 
              title="DSC Formation" 
              subtitle="Create Doctoral Scrutiny Committees for students" 
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-medium text-lg mb-4">Create New DSC</h3>
                <form>
                  <div className="mb-4">
                    <label className="block text-black text-sm font-medium mb-2">Department</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500">
                      <option value="">Select Department</option>
                      <option value="cs">Computer Science</option>
                      <option value="ee">Electrical Engineering</option>
                      <option value="me">Mechanical Engineering</option>
                    </select>
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-black text-sm font-medium mb-2">Student Email</label>
                    <input 
                      type="email" 
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                      placeholder="Enter student's email" 
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-black text-sm font-medium mb-2">Supervisor Email</label>
                    <input 
                      type="email" 
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                      placeholder="Enter supervisor's email" 
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-black text-sm font-medium mb-2">Co-Supervisor Email (Optional)</label>
                    <input 
                      type="email" 
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                      placeholder="Enter co-supervisor's email (if applicable)" 
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-black text-sm font-medium mb-2">DSC Member 1 Email</label>
                    <input 
                      type="email" 
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                      placeholder="Enter DSC member's email" 
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-black text-sm font-medium mb-2">DSC Member 2 Email</label>
                    <input 
                      type="email" 
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                      placeholder="Enter DSC member's email" 
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-black text-sm font-medium mb-2">DSC Member 3 Email</label>
                    <input 
                      type="email" 
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                      placeholder="Enter DSC member's email" 
                    />
                  </div>
                  
                  <ActionButton onClick={() => console.log("Creating DSC...")}>Create DSC</ActionButton>

                </form>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-medium text-lg mb-4">Existing DSCs</h3>
                <div className="overflow-y-auto max-h-96">
                  <div className="space-y-3">
                    <div className="border border-gray-200 rounded p-3 hover:bg-gray-50">
                      <div className="flex justify-between">
                        <div>
                          <h4 className="font-medium">Computer Science DSC 1</h4>
                          <p className="text-sm text-black">Created: 2023-04-15</p>
                        </div>
                        <button className="text-blue-600 hover:underline">View Details</button>
                      </div>
                      <div className="mt-2">
                        <p className="text-sm">Student: Ankit Joshi</p>
                        <p className="text-sm">Supervisor: Dr. Rajiv Kumar</p>
                      </div>
                    </div>
                    
                    <div className="border border-gray-200 rounded p-3 hover:bg-gray-50">
                      <div className="flex justify-between">
                        <div>
                          <h4 className="font-medium">Physics DSC 2</h4>
                          <p className="text-sm text-black">Created: 2023-04-10</p>
                        </div>
                        <button className="text-blue-600 hover:underline">View Details</button>
                      </div>
                      <div className="mt-2">
                        <p className="text-sm">Student: Meera Shah</p>
                        <p className="text-sm">Supervisor: Dr. Anand Mishra</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        )}

        {activeTab === 'cosupervisors' && (
          <Card>
            <DashboardHeader 
              title="Co-Supervisor Management" 
              subtitle="Review co-supervisor requests and assign co-supervisors" 
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-medium text-lg mb-4">Co-Supervisor Requests</h3>
                <div className="overflow-y-auto max-h-80">
                  <table className="min-w-full bg-white border border-gray-200">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="py-2 px-4 border-b text-left">ID</th>
                        <th className="py-2 px-4 border-b text-left">Student</th>
                        <th className="py-2 px-4 border-b text-left">Professor</th>
                        <th className="py-2 px-4 border-b text-left">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockCoSupervisorRequests.map((request) => (
                        <tr key={request.id} className="hover:bg-gray-50">
                          <td className="py-2 px-4 border-b">{request.id}</td>
                          <td className="py-2 px-4 border-b">
                            {request.studentName}
                            <div className="text-xs text-black">{request.department}</div>
                          </td>
                          <td className="py-2 px-4 border-b">{request.professorName}</td>
                          <td className="py-2 px-4 border-b">
                            <div className="flex space-x-2">
                              <ActionButton color="green" onClick={() => console.log("Approving...")}>Approve</ActionButton>
                              <ActionButton color="red" onClick={() => console.log("Rejecting...")}>Reject</ActionButton>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-medium text-lg mb-4">Manual Co-Supervisor Assignment</h3>
                <form>
                  <EmailInput 
                    label="Student Email" 
                    placeholder="Enter student's email address" 
                  />
                  <EmailInput 
                    label="Co-Supervisor Email" 
                    placeholder="Enter co-supervisor's email address" 
                  />
                  <div className="mt-4">
                    <ActionButton onClick={() => console.log("Assigning Co-supervisor")}>Assign Co-Supervisor</ActionButton>
                  </div>
                </form>
              </div>
            </div>
          </Card>
        )}

        {activeTab === 'thesis' && (
          <Card>
            <DashboardHeader 
              title="Final Thesis Approvals" 
              subtitle="Review and approve final thesis submissions" 
            />
            
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="py-2 px-4 border-b text-left">ID</th>
                    <th className="py-2 px-4 border-b text-left">Scholar Name</th>
                    <th className="py-2 px-4 border-b text-left">Department</th>
                    <th className="py-2 px-4 border-b text-left">Submission Date</th>
                    <th className="py-2 px-4 border-b text-left">Supervisor</th>
                    <th className="py-2 px-4 border-b text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {mockThesisSubmissions.map((thesis) => (
                    <tr key={thesis.id} className="hover:bg-gray-50">
                      <td className="py-3 px-4 border-b">{thesis.id}</td>
                      <td className="py-3 px-4 border-b">{thesis.name}</td>
                      <td className="py-3 px-4 border-b">{thesis.department}</td>
                      <td className="py-3 px-4 border-b">{thesis.submissionDate}</td>
                      <td className="py-3 px-4 border-b">{thesis.supervisor}</td>
                      <td className="py-3 px-4 border-b">
                        <div className="flex space-x-2">
                          <ActionButton color="blue" onClick={() => console.log("Viewing thesis...")}>View Thesis</ActionButton>
                          <ActionButton color="green" onClick={() => console.log("Approving thesis...")}>Approve</ActionButton>
                          <ActionButton color="red" onClick={() => console.log("Rejecting thesis...")}>Reject</ActionButton>

                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}

        {activeTab === 'records' && (
          <Card>
            <DashboardHeader 
              title="System Records" 
              subtitle="View and download records for all entities in the system" 
            />
            
            <div className="mb-6">
              <div className="flex space-x-2 mb-4">
                <TabButton 
                  active={true} 
                  onClick={() => {}}
                >
                  Students
                </TabButton>
                <TabButton 
                  active={false}
                  onClick={() => {}}
                >
                  Supervisors
                </TabButton>
                <TabButton 
                  active={false}
                  onClick={() => {}}
                >
                  DSC Members
                </TabButton>
                <TabButton 
                  active={false}
                  onClick={() => {}}
                >
                  Co-Supervisors
                </TabButton>
              </div>
              
              <div className="flex justify-between mb-4">
                <div className="relative w-64">
                  <input 
                    type="text" 
                    placeholder="Search records..." 
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                  <svg className="h-5 w-5 text-black absolute left-3 top-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <div className="flex space-x-2">
                  <select className="border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-amber-500">
                    <option value="">All Departments</option>
                    <option value="cs">Computer Science</option>
                    <option value="ee">Electrical Engineering</option>
                    <option value="me">Mechanical Engineering</option>
                  </select>
                  <ActionButton onClick={() => console.log("Filtering...")}>Filter</ActionButton>

                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="py-2 px-4 border-b text-left">ID</th>
                      <th className="py-2 px-4 border-b text-left">Name</th>
                      <th className="py-2 px-4 border-b text-left">Department</th>
                      <th className="py-2 px-4 border-b text-left">Email</th>
                      <th className="py-2 px-4 border-b text-left">Status</th>
                      <th className="py-2 px-4 border-b text-left">Supervisor</th>
                      <th className="py-2 px-4 border-b text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="hover:bg-gray-50">
                      <td className="py-2 px-4 border-b">PHD2022001</td>
                      <td className="py-2 px-4 border-b">Kiran Kumar</td>
                      <td className="py-2 px-4 border-b">Biotechnology</td>
                      <td className="py-2 px-4 border-b">kiran@example.com</td>
                      <td className="py-2 px-4 border-b">
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Thesis Submitted
                        </span>
                      </td>
                      <td className="py-2 px-4 border-b">Dr. Sunita Verma</td>
                      <td className="py-2 px-4 border-b">
                        <button className="text-blue-600 hover:underline">View Details</button>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="py-2 px-4 border-b">PHD2022003</td>
                      <td className="py-2 px-4 border-b">Nisha Verma</td>
                      <td className="py-2 px-4 border-b">Mathematics</td>
                      <td className="py-2 px-4 border-b">nisha@example.com</td>
                      <td className="py-2 px-4 border-b">
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                          Thesis Evaluation
                        </span>
                      </td>
                      <td className="py-2 px-4 border-b">Dr. Ramesh Shah</td>
                      <td className="py-2 px-4 border-b">
                        <button className="text-blue-600 hover:underline">View Details</button>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="py-2 px-4 border-b">PHD2023001</td>
                      <td className="py-2 px-4 border-b">Ananya Sharma</td>
                      <td className="py-2 px-4 border-b">Computer Science</td>
                      <td className="py-2 px-4 border-b">ananya@example.com</td>
                      <td className="py-2 px-4 border-b">
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                          Pending Review
                        </span>
                      </td>
                      <td className="py-2 px-4 border-b">-</td>
                      <td className="py-2 px-4 border-b">
                        <button className="text-blue-600 hover:underline">View Details</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <div className="mt-4 flex justify-between items-center">
                <p className="text-sm text-black">Showing 1-3 of 25 entries</p>
                <div className="flex space-x-2">
                  <button className="px-3 py-1 border border-gray-300 rounded-md bg-white text-black hover:bg-gray-50">
                    Previous
                  </button>
                  <button className="px-3 py-1 border border-gray-300 rounded-md bg-amber-600 text-white">
                    1
                  </button>
                  <button className="px-3 py-1 border border-gray-300 rounded-md bg-white text-black hover:bg-gray-50">
                    2
                  </button>
                  <button className="px-3 py-1 border border-gray-300 rounded-md bg-white text-black hover:bg-gray-50">
                    3
                  </button>
                  <button className="px-3 py-1 border border-gray-300 rounded-md bg-white text-black hover:bg-gray-50">
                    Next
                  </button>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end">
                <div className="flex space-x-2">
                  <ActionButton color="blue" onClick={() => console.log("Exporting to Excel...")}>Export to Excel</ActionButton>
                  <ActionButton color="blue" onClick={() => console.log("Exporting to PDF...")}>Export to PDF</ActionButton>
                  <ActionButton onClick={() => console.log("Downloading all records...")}>Download All Records</ActionButton>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Analytics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card>
            <h3 className="text-lg font-semibold mb-4">Applications Overview</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-amber-50 p-4 rounded-lg">
                <p className="text-sm text-amber-700">Pending</p>
                <p className="text-2xl font-bold text-amber-800">12</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-sm text-green-700">Approved</p>
                <p className="text-2xl font-bold text-green-800">45</p>
              </div>
              <div className="bg-red-50 p-4 rounded-lg">
                <p className="text-sm text-red-700">Rejected</p>
                <p className="text-2xl font-bold text-red-800">8</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-blue-700">Total</p>
                <p className="text-2xl font-bold text-blue-800">65</p>
              </div>
            </div>
          </Card>
          
          <Card>
            <h3 className="text-lg font-semibold mb-4">DSC Status</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-purple-50 p-4 rounded-lg">
                <p className="text-sm text-purple-700">Active DSCs</p>
                <p className="text-2xl font-bold text-purple-800">28</p>
              </div>
              <div className="bg-indigo-50 p-4 rounded-lg">
                <p className="text-sm text-indigo-700">Pending Formation</p>
                <p className="text-2xl font-bold text-indigo-800">5</p>
              </div>
              <div className="bg-teal-50 p-4 rounded-lg">
                <p className="text-sm text-teal-700">Completed</p>
                <p className="text-2xl font-bold text-teal-800">17</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-black">Total</p>
                <p className="text-2xl font-bold text-black">50</p>
              </div>
            </div>
          </Card>
          
          <Card>
            <h3 className="text-lg font-semibold mb-4">Thesis Status</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-yellow-50 p-4 rounded-lg">
                <p className="text-sm text-yellow-700">Pending Review</p>
                <p className="text-2xl font-bold text-yellow-800">7</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-sm text-green-700">Approved</p>
                <p className="text-2xl font-bold text-green-800">22</p>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg">
                <p className="text-sm text-orange-700">Revision Required</p>
                <p className="text-2xl font-bold text-orange-800">3</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-blue-700">Total</p>
                <p className="text-2xl font-bold text-blue-800">32</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button className="flex flex-col items-center justify-center p-4 bg-amber-50 rounded-lg hover:bg-amber-100 transition-colors">
              <svg className="h-8 w-8 text-amber-600 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-amber-800 font-medium">Batch Approve Applications</span>
            </button>
            
            <button className="flex flex-col items-center justify-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
              <svg className="h-8 w-8 text-blue-600 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className="text-blue-800 font-medium">Create DSC</span>
            </button>
            
            <button className="flex flex-col items-center justify-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
              <svg className="h-8 w-8 text-green-600 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
              <span className="text-green-800 font-medium">Generate Reports</span>
            </button>
            
            <button className="flex flex-col items-center justify-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
              <svg className="h-8 w-8 text-purple-600 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="text-purple-800 font-medium">Schedule DRC Meeting</span>
            </button>
          </div>
        </Card>

        {/* Recent Notifications */}
        <Card>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Recent Notifications</h3>
            <button className="text-amber-600 hover:underline text-sm">View All</button>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-start p-3 bg-blue-50 rounded-lg">
              <div className="flex-shrink-0 mr-3">
                <div className="h-10 w-10 rounded-full bg-blue-200 flex items-center justify-center">
                  <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
              </div>
              <div>
                <p className="font-medium">New application from Arjun Desai (Computer Science)</p>
                <p className="text-sm text-black">10 minutes ago</p>
              </div>
            </div>
            
            <div className="flex items-start p-3 bg-green-50 rounded-lg">
              <div className="flex-shrink-0 mr-3">
                <div className="h-10 w-10 rounded-full bg-green-200 flex items-center justify-center">
                  <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <div>
                <p className="font-medium">Thesis approved for Kiran Kumar (Biotechnology)</p>
                <p className="text-sm text-black">45 minutes ago</p>
              </div>
            </div>
            
            <div className="flex items-start p-3 bg-amber-50 rounded-lg">
              <div className="flex-shrink-0 mr-3">
                <div className="h-10 w-10 rounded-full bg-amber-200 flex items-center justify-center">
                  <svg className="h-6 w-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                </div>
              </div>
              <div>
                <p className="font-medium">Co-supervisor request from Dr. Amit Kumar for Vikram Singh</p>
                <p className="text-sm text-black">2 hours ago</p>
              </div>
            </div>
          </div>
        </Card>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <svg className="h-8 w-8 text-amber-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              <div>
                <h3 className="font-bold text-black">DRC Management System</h3>
                <p className="text-sm text-black-600">© 2025 University Research Division</p>
              </div>
            </div>
            <div className="flex space-x-4">
              <button className="text-black hover:text-amber-600">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button>
              <button className="text-black hover:text-amber-600">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </button>
              <button className="text-black hover:text-amber-600">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Modals/Overlays could be added here */}
    </div>
  );
}