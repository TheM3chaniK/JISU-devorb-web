import { Request, Response } from "express";
import { AcademicProfiles } from "@/test-data/phdscoller.js";
import {
  ProgressReportStatus,
  ProrgressReportStatusHumanReadable,
} from "@/types/Document.js";

export const getAssignedScholars = (req: Request, res: Response) => {
  const { scholarId } = req.query;
  if (scholarId) {
    const scholar = AcademicProfiles.filter((e) => e.id === Number(scholarId));
    if (!scholar) {
      return res
        .status(404)
        .json({ message: "Scholar with that enrollmentId not found" });
    }
    return res.status(200).json(scholar);
  }
  const scholarDetails = AcademicProfiles.filter(
    (e) => e.supervisor.name === "Dr. Emily Smith",
  );

  const humanReadableScholarDetails = scholarDetails.map((e) => {
    return {
      ...e,
      progressReports: e.progressReports.map((report) => {
        return {
          ...report,
          status: ProrgressReportStatusHumanReadable[report.status],
        };
      }),
    };
  });
  console.log(humanReadableScholarDetails);

  return res
    .status(200)
    .json({ assignedScholars: humanReadableScholarDetails });
};

export const approveReport = (req: Request, res: Response) => {
  const { id } = req.params;

  const report = AcademicProfiles[0].progressReports.find(
    (e) => e.id === Number(id),
  );

  if (!report) {
    return res.status(404).json({ message: "Report Not found" });
  }

  report.status = report.status - 1;

  return res
    .status(200)
    .json({ message: "Send the progress report to next step" });
};

export const rejectReport = (req: Request, res: Response) => {
  const { id } = req.params;
  const report = AcademicProfiles[0].progressReports.find(
    (e) => e.id === Number(id),
  );

  if (!report) {
    return res.status(404).json({ message: "Report Not found" });
  }

  report.status = ProgressReportStatus.rejected;

  return res.status(200).json({ message: "Rejected" });
};
