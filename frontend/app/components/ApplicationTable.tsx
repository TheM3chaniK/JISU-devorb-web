/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';

// Define the application interface
interface Application {
  id: string;
  name: string;
  department: string;
  status: string;
  submissionDate?: string;
  [key: string]: any; // For any additional properties
}

// Define the props interface for the ApplicationTable component
interface ApplicationTableProps {
  applications: Application[];
  title?: string;
  onViewClick?: (application: Application) => void;
  onVerifyClick?: (application: Application) => void;
  onRejectClick?: (application: Application) => void;
}

const ApplicationTable: React.FC<ApplicationTableProps> = ({ 
  applications, 
  title = "Applications", 
  onViewClick, 
  onVerifyClick, 
  onRejectClick 
}) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [departmentFilter, setDepartmentFilter] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('');
  
  const applicationsPerPage = 10;

  // Get list of unique departments for filter
  const departments = [...new Set(applications.map(app => app.department))];
  
  // Get list of unique statuses for filter
  const statuses = [...new Set(applications.map(app => app.status))];

  // Filter applications based on search term and filters
  const filteredApplications = applications.filter(app => {
    const matchesSearch = searchTerm === '' || 
      app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.id.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesDepartment = departmentFilter === '' || app.department === departmentFilter;
    const matchesStatus = statusFilter === '' || app.status === statusFilter;
    
    return matchesSearch && matchesDepartment && matchesStatus;
  });

  // Pagination logic
  const indexOfLastApp = currentPage * applicationsPerPage;
  const indexOfFirstApp = indexOfLastApp - applicationsPerPage;
  const currentApplications = filteredApplications.slice(indexOfFirstApp, indexOfLastApp);
  const totalPages = Math.ceil(filteredApplications.length / applicationsPerPage);

  // Status badge color mapping
  const getStatusBadgeClass = (status: string): string => {
    switch(status) {
      case 'Pending Review':
        return 'bg-yellow-100 text-yellow-800';
      case 'Documents Verified':
        return 'bg-blue-100 text-blue-800';
      case 'Approved':
        return 'bg-green-100 text-green-800';
      case 'Rejected':
        return 'bg-red-100 text-red-800';
      case 'Needs Supervisor':
        return 'bg-purple-100 text-purple-800';
      case 'DSC Review':
        return 'bg-indigo-100 text-indigo-800';
      case 'Pre-submission':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Handle page changes
  const paginate = (pageNumber: number): void => setCurrentPage(pageNumber);
  const nextPage = (): void => setCurrentPage(prev => Math.min(prev + 1, totalPages));
  const prevPage = (): void => setCurrentPage(prev => Math.max(prev - 1, 1));

  // Reset to first page when filters change
  const handleFilterChange = (filterFn: () => void): void => {
    filterFn();
    setCurrentPage(1);
  };

  return (
    <div className="bg-white rounded-xl shadow-md mb-6 p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
        <div className="flex gap-2">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search applications..." 
              value={searchTerm}
              onChange={(e) => handleFilterChange(() => setSearchTerm(e.target.value))}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            />
            <svg className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          
          <select 
            value={departmentFilter}
            onChange={(e) => handleFilterChange(() => setDepartmentFilter(e.target.value))}
            className="border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          >
            <option value="">All Departments</option>
            {departments.map((dept, index) => (
              <option key={index} value={dept}>{dept}</option>
            ))}
          </select>
          
          {statuses.length > 0 && (
            <select 
              value={statusFilter}
              onChange={(e) => handleFilterChange(() => setStatusFilter(e.target.value))}
              className="border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            >
              <option value="">All Status</option>
              {statuses.map((status, index) => (
                <option key={index} value={status}>{status}</option>
              ))}
            </select>
          )}
          
          <button 
            onClick={() => {
              setSearchTerm('');
              setDepartmentFilter('');
              setStatusFilter('');
              setCurrentPage(1);
            }}
            className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg shadow-sm transition"
          >
            Reset
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
              {applications.length > 0 && applications[0].submissionDate && (
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Submission Date</th>
              )}
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {currentApplications.length > 0 ? (
              currentApplications.map((application) => (
                <tr key={application.id} className="hover:bg-gray-50">
                  <td className="py-4 px-4 text-sm text-gray-900">{application.id}</td>
                  <td className="py-4 px-4 text-sm text-gray-900">{application.name}</td>
                  <td className="py-4 px-4 text-sm text-gray-900">{application.department}</td>
                  <td className="py-4 px-4 text-sm">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeClass(application.status)}`}>
                      {application.status}
                    </span>
                  </td>
                  {application.submissionDate && (
                    <td className="py-4 px-4 text-sm text-gray-900">{application.submissionDate}</td>
                  )}
                  <td className="py-4 px-4 text-sm">
                    <button 
                      onClick={() => onViewClick && onViewClick(application)}
                      className="text-amber-600 hover:text-amber-800 font-medium mr-2"
                    >
                      View
                    </button>
                    {onVerifyClick && application.status !== 'Approved' && application.status !== 'Rejected' && (
                      <button 
                        onClick={() => onVerifyClick(application)}
                        className="text-green-600 hover:text-green-800 font-medium mr-2"
                      >
                        {application.status === 'Documents Verified' ? 'Approve' : 'Verify'}
                      </button>
                    )}
                    {onRejectClick && application.status !== 'Approved' && application.status !== 'Rejected' && (
                      <button 
                        onClick={() => onRejectClick(application)}
                        className="text-red-600 hover:text-red-800 font-medium"
                      >
                        Reject
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="py-4 px-4 text-sm text-gray-500 text-center">
                  No applications found matching your criteria
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {filteredApplications.length > 0 && (
        <div className="mt-4 flex justify-between items-center">
          <div className="text-sm text-gray-500">
            Showing <span className="font-medium">{indexOfFirstApp + 1}</span> to{" "}
            <span className="font-medium">
              {Math.min(indexOfLastApp, filteredApplications.length)}
            </span>{" "}
            of <span className="font-medium">{filteredApplications.length}</span> results
          </div>
          
          {totalPages > 1 && (
            <div className="flex space-x-2">
              <button 
                onClick={prevPage}
                disabled={currentPage === 1}
                className={`px-3 py-1 border border-gray-300 rounded-md ${
                  currentPage === 1 
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                    : 'bg-white text-gray-500 hover:bg-gray-50'
                }`}
              >
                Previous
              </button>
              
              {/* Page numbers */}
              {Array.from({ length: Math.min(totalPages, 5) }).map((_, index) => {
                // Logic to show current page and surrounding pages
                let pageNumber: number;
                if (totalPages <= 5) {
                  pageNumber = index + 1;
                } else if (currentPage <= 3) {
                  pageNumber = index + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNumber = totalPages - 4 + index;
                } else {
                  pageNumber = currentPage - 2 + index;
                }
                
                return (
                  <button
                    key={index}
                    onClick={() => paginate(pageNumber)}
                    className={`px-3 py-1 border border-gray-300 rounded-md ${
                      currentPage === pageNumber
                        ? 'bg-amber-600 text-white hover:bg-amber-700'
                        : 'bg-white text-gray-500 hover:bg-gray-50'
                    }`}
                  >
                    {pageNumber}
                  </button>
                );
              })}
              
              <button 
                onClick={nextPage}
                disabled={currentPage === totalPages}
                className={`px-3 py-1 border border-gray-300 rounded-md ${
                  currentPage === totalPages 
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                    : 'bg-white text-gray-500 hover:bg-gray-50'
                }`}
              >
                Next
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ApplicationTable;