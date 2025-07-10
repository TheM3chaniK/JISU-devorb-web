import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import StatusBadge from "../components/StatusBadge";
import { ProgressReport, ProgressReportStatus } from "../types/Documents";

const ProgressReports: React.FC = () => {
  const [reports, setReports] = useState<ProgressReport[]>([]);

  useEffect(() => {
    fetch("/api/docs/progress-reports/")
      .then((res) => res.json())
      .then((data) => {
        const reportsArray = data.progressReports;

        const completeReports: ProgressReport[] = [];

        for (let i = 1; i <= 6; i++) {
          const found = reportsArray.find(
            (r: ProgressReport) => r.reportNumber === i
          );

          if (found) {
            completeReports.push(found);
          } else {
            completeReports.push({
              id: i,
              reportNumber: i,
              title: `Progress Report ${i}`,
              submittedOn: "N/A",
              status: ProgressReportStatus.NotStarted,
              filename: "",
            });
          }
        }

        setReports(completeReports);
      })
      .catch((err) => console.error("Failed to fetch reports:", err));
  }, []);

  const handleUpload = async (reportNumber: number) => {
    const input = document.createElement("input");
    input.type = "file";
    input.multiple = false; // ✅ single file only

    input.onchange = async (event: any) => {
      const files = event.target.files;
      if (!files.length) return;

      const formData = new FormData();
      formData.append("reportNumber", reportNumber.toString());
      formData.append("report", files[0]); // ✅ MUST MATCH .single("report")

      try {
        const res = await fetch("http://localhost:5000/api/docs/progress-reports/", {
          method: "POST",
          body: formData,
        });

        if (!res.ok) {
          console.error("Upload failed:", res.statusText);
          alert("Upload failed!");
          return;
        }

        alert("Upload successful!");
        window.location.reload();
      } catch (err) {
        console.error("Upload error:", err);
        alert("Upload error!");
      }
    };

    input.click();
  };

  return (
    <Card title="Progress Reports">
      <div className="space-y-4">
        {reports.map((report) => (
          <div
            key={report.id}
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-gray-100 pb-4 last:border-0 last:pb-0"
          >
            <div>
              <h4 className="text-sm font-medium text-black">{report.title}</h4>
              {report.submittedOn && report.submittedOn !== "N/A" ? (
                <p className="text-xs text-black mt-1">
                  Submitted on {report.submittedOn}
                </p>
              ) : (
                <p className="text-xs text-black mt-1">Not yet submitted</p>
              )}
            </div>
            <div className="flex items-center space-x-3 mt-2 sm:mt-0">
              <StatusBadge status={report.status} />
              {report.status === ProgressReportStatus.NotStarted ? (
                <button
                  className="bg-blue-600 text-white text-xs font-medium py-1 px-3 rounded hover:bg-blue-700 transition"
                  onClick={() => handleUpload(report.reportNumber)}
                >
                  Upload
                </button>
              ) : (
                <a
                  href={`/api/docs/progress-reports/${report.reportNumber}/view`}
                  className="text-blue-600 hover:text-blue-800 text-sm"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default ProgressReports;

