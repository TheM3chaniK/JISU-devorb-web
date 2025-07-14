import { Request, Response } from "express";
import { ProgressReport, ProgressReportStatus } from "@/types/Document.js";

import { randomInt } from "node:crypto";
import { AcademicProfiles } from "@/test-data/phdscoller.js";

export const uploadProgressReport = (req: Request, res: Response) => {
  const { id, reportNumber } = req.body;

  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }
  // const academicProfile = AcademicProfiles.find(
  //   (e) => e.id === Number(id),
  // );
  // if (!academicProfile)
  //   return res.status(404).json({ message: "Can't Find Scholar with this id" });
  const report: ProgressReport = {
    id: randomInt(1, 100),
    reportNumber: Number(reportNumber),
    title: `Report Number ${reportNumber} `,
    status: ProgressReportStatus.PendingSupervisorApproval,
    submittedOn: new Date().toISOString(),
    filename: req.file.filename,
  };

  try {
    AcademicProfiles[0].progressReports.push(report);

    return res.status(200).json({
      message: "Document uploaded successfully",
    });
  } catch (err) {
    console.error(`Progress Report Can not be updated: ${err}`);
    return res.status(500).json({ message: "Something went wrong" });
  }
};
