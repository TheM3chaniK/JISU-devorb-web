import React from "react";
import Card from "../components/Card";
import StatusBadge from "../components/StatusBadge";

const PreThesisCard: React.FC = () => {
  return (
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
  );
};

export default PreThesisCard;

