import { Request, Response } from "express";
import { ProgressReport, ProgressReportStatus } from "@/types/Document.js";
import { progressReports } from "@/test-data/forms.js";

export const uploadProgressReport = (req: Request, res: Response) => {
  const { reportNumber } = req.body;

  const report: ProgressReport = {
    id: progressReports.length + 1,
    reportNumber: Number(reportNumber),
    title: `Report Number ${reportNumber} `,
    status: ProgressReportStatus.PendingSupervisorApproval,
  };

  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  report.filename = req.file.filename;

  report.status = ProgressReportStatus.PendingSupervisorApproval;
  report.submittedOn = new Date().toISOString();

  try {
    progressReports.push(report);

    return res.status(200).json({
      message: "Document uploaded successfully",
    });
  } catch (err) {
    console.error(`Progress Report Can not be updated: ${err}`);
    return res.status(500).json({ message: "Something went wrong" });
  }
};
