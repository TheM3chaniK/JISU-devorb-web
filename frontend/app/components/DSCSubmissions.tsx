/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState, useEffect } from 'react';
import { Scholar } from '../types/Scholar';

// Define types for our data models
interface Submission {
  id: number | string;
  scholarId: number;
  scholarName: string;
  title: string;
  type: string; // 'progress', 'research', 'thesis', 'form'
  category?: string; // For forms: 'Enrollment', 'Committee', 'Coursework'
  status: string;
  date: string;
  document: string;
}

interface DSCSubmissionsProps {
  scholars: Scholar[];

}

const DSCSubmissions = ({ scholars }: DSCSubmissionsProps) => {
  const [pendingSubmissions, setPendingSubmissions] = useState<Submission[]>([]);
  const [selectedSubmissions, setSelectedSubmissions] = useState<Submission[]>([]);
  const [filter, setFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isSending, setIsSending] = useState<boolean>(false);
  const [message, setMessage] = useState<{text: string, type: string} | null>(null);

  useEffect(() => {
    // Extract and process all approved submissions that need to be pushed to DSC
    const extractSubmissions = () => {
      const submissions: Submission[] = [];

      scholars.forEach(scholar => {
        // Add progress reports that are approved but not yet sent to DSC
        scholar.progressReports
          .filter((report: { status: string; }) => report.status === 'Approved')
          .forEach((report: { id: any; title: any; date: any; document: any; }) => {
            submissions.push({
              id: `progress-${scholar.id}-${report.id}`,
              scholarId: scholar.id,
              scholarName: scholar.name,
              title: report.title,
              type: 'progress',
              status: 'Ready for DSC',
              date: report.date,
              document: report.document
            });
          });

        // Add research submissions that are approved but not yet sent to DSC
        scholar.researchSubmissions
          .filter((submission: { status: string; }) => submission.status === 'Approved')
          .forEach((submission: { id: any; title: any; date: any; document: any; }) => {
            submissions.push({
              id: `research-${scholar.id}-${submission.id}`,
              scholarId: scholar.id,
              scholarName: scholar.name,
              title: submission.title,
              type: 'research',
              status: 'Ready for DSC',
              date: submission.date,
              document: submission.document
            });
          });

        // Add forms that are approved but not yet sent to DSC
        scholar.forms
          .forEach((form: { id: any; title: any; category: any; submittedDate: any; document: any; }) => {
            submissions.push({
              id: `form-${scholar.id}-${form.id}`,
              scholarId: scholar.id,
              scholarName: scholar.name,
              title: form.title,
              type: 'form',
              category: form.category,
              status: 'Ready for DSC',
              date: form.submittedDate,
              document: form.document
            });
          });
      });

      return submissions;
    };

    setPendingSubmissions(extractSubmissions());
  }, [scholars]);

  const toggleSubmissionSelection = (submission: Submission) => {
    if (selectedSubmissions.some(item => item.id === submission.id)) {
      setSelectedSubmissions(selectedSubmissions.filter(item => item.id !== submission.id));
    } else {
      setSelectedSubmissions([...selectedSubmissions, submission]);
    }
  };

  const selectAll = () => {
    if (selectedSubmissions.length === filteredSubmissions.length) {
      setSelectedSubmissions([]);
    } else {
      setSelectedSubmissions([...filteredSubmissions]);
    }
  };

  const handlePushToDSC = () => {
    if (selectedSubmissions.length === 0) {
      setMessage({text: 'No submissions selected', type: 'error'});
      return;
    }

    setIsSending(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSending(false);
      setMessage({text: 'Successfully pushed submissions to DSC', type: 'success'});
      
      // Remove the pushed submissions from the pendingSubmissions list
      const updatedPendingSubmissions = pendingSubmissions.filter(
        item => !selectedSubmissions.some(selected => selected.id === item.id)
      );
      setPendingSubmissions(updatedPendingSubmissions);
      setSelectedSubmissions([]);
      
      setTimeout(() => {
        setMessage(null);
      }, 3000);
    }, 1500);
  };

  const filteredSubmissions = pendingSubmissions.filter(submission => {
    const matchesFilter = 
      filter === 'all' || 
      (filter === 'progress' && submission.type === 'progress') ||
      (filter === 'research' && submission.type === 'research') ||
      (filter === 'form' && submission.type === 'form') ||
      (filter === 'enrollment' && submission.category === 'Enrollment') ||
      (filter === 'committee' && submission.category === 'Committee') ||
      (filter === 'coursework' && submission.category === 'Coursework');
    
    const matchesSearch = 
      submission.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      submission.scholarName.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  const getSubmissionTypeLabel = (submission: Submission) => {
    if (submission.type === 'form' && submission.category) {
      return `Form (${submission.category})`;
    }
    return submission.type.charAt(0).toUpperCase() + submission.type.slice(1);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Push to Doctoral Scrutiny Committee (DSC)</h3>
      
      {message && (
        <div className={`mb-4 p-3 rounded ${message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {message.text}
        </div>
      )}

      <div className="flex flex-col md:flex-row justify-between mb-4 space-y-3 md:space-y-0">
        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
          <div className="relative">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm rounded-md"
            >
              <option value="all">All Submissions</option>
              <option value="progress">Progress Reports</option>
              <option value="research">Research Submissions</option>
              <option value="form">All Forms</option>
              <option value="enrollment">Enrollment Forms</option>
              <option value="committee">Committee Forms</option>
              <option value="coursework">Coursework Forms</option>
            </select>
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="Search by title or scholar name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
            />
          </div>
        </div>
        <div>
          <button
            onClick={handlePushToDSC}
            disabled={selectedSubmissions.length === 0 || isSending}
            className={`px-4 py-2 rounded-md text-white ${
              selectedSubmissions.length === 0 || isSending
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-emerald-600 hover:bg-emerald-700'
            }`}
          >
            {isSending ? 'Sending...' : `Push ${selectedSubmissions.length} Items to DSC`}
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                    checked={selectedSubmissions.length === filteredSubmissions.length && filteredSubmissions.length > 0}
                    onChange={selectAll}
                  />
                </div>
              </th>
              <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Scholar</th>
              <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
              <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
              <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Document</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredSubmissions.length > 0 ? (
              filteredSubmissions.map((submission) => (
                <tr key={submission.id} className="hover:bg-gray-50">
                  <td className="px-3 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                        checked={selectedSubmissions.some(item => item.id === submission.id)}
                        onChange={() => toggleSubmissionSelection(submission)}
                      />
                    </div>
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{submission.scholarName}</div>
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{submission.title}</div>
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      submission.type === 'progress' ? 'bg-blue-100 text-blue-800' : 
                      submission.type === 'research' ? 'bg-purple-100 text-purple-800' : 
                      'bg-orange-100 text-orange-800'
                    }`}>
                      {getSubmissionTypeLabel(submission)}
                    </span>
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                    {submission.date}
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap text-sm text-blue-600">
                    <a href="#" className="hover:text-blue-900">
                      {submission.document}
                    </a>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-3 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                  {searchTerm || filter !== 'all' 
                    ? "No submissions match your filter criteria" 
                    : "No submissions ready to push to DSC"}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {pendingSubmissions.length > 0 && (
        <div className="mt-4 text-right">
          <p className="text-sm text-gray-500">
            {selectedSubmissions.length} of {pendingSubmissions.length} submissions selected
          </p>
        </div>
      )}
    </div>
  );
};

export default DSCSubmissions;
