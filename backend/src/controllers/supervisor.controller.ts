import { Request, Response } from "express";
import { AcademicProfiles } from "@/test-data/phdscoller.js";
import { AcademicProfile } from "@/types/AcademicProfile.js";
import { progressReports } from "@/test-data/forms.js";
import { ProgressReportStatus } from "@/types/Document.js";

interface Scholar {
  id: number;
  name: string;
  department: string;
  enrollmentId: string;
}

export const assignedScholars: Scholar[] = [
  {
    id: 1,
    name: "John Doe",
    enrollmentId: "xyz-1234",
    department: "Computer Science",
  },
];

export const getAssignedScholars = (req: Request, res: Response) => {
  const { id: enrollmentId } = req.query;
  if (!enrollmentId) {
    if (!assignedScholars) {
      return res.status(404).json({ message: "No Asigned Scholars Found" });
    }

    return res.status(200).json({ assignedScholars });
  }
  const scholar = assignedScholars.find((e) => e.enrollmentId === enrollmentId);

  if (!scholar) {
    return res
      .status(404)
      .json({ message: "Scholar with that enrollmentId not found" });
  }

  const scholarDetails = AcademicProfiles.find(
    (e) => e.enrollmentId === scholar.enrollmentId,
  );

  if (!scholarDetails) {
    return res.status(404).json({ message: "Scholar details not found" });
  }

  return res.status(200).json({ ...scholarDetails });
};

export const approveReport = (req: Request, res: Response) => {
  const { id } = req.params;

  const report = progressReports.find((e) => e.id === Number(id));

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
  const report = progressReports.find((e) => e.id === Number(id));

  if (!report) {
    return res.status(404).json({ message: "Report Not found" });
  }

  report.status = ProgressReportStatus.rejected;

  return res.status(200).json({ message: "Rejected" });
};
