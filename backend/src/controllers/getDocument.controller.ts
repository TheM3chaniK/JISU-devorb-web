import { Request, Response } from "express";
import path from "path";
import { forms } from "@/test-data/forms.js";
import { ProrgressReportStatusHumanReadable } from "@/types/Document.js";
import { AcademicProfiles } from "@/test-data/phdscoller.js";

export const getForms = (req: Request, res: Response) => {
  return res.status(200).json({ forms });
};

export const getProgressReports = (req: Request, res: Response) => {
  // const { id } = req.query;
  // const academicProfile = AcademicProfiles.find((e) => e.id === Number(id));
  // if (!academicProfile)
    // return res.status(404).json({ message: "Can't Find Scholar with this id" });
  const _progressReports = AcademicProfiles[0].progressReports.map((e) => {
    return { ...e, status: ProrgressReportStatusHumanReadable[e.status] };
  });
  return res.status(200).json({ progressReports: [..._progressReports] });
};

export const downloadForm = (req: Request, res: Response) => {
  const { id } = req.params;

  const form = forms.find((f) => f.id === id);
  if (!form) {
    return res.status(404).json({ message: "Form not found" });
  }

  if (!form.filename) {
    return res.status(404).json({ message: "Form file not available" });
  }

  const baseURI = process.env.FORM_BASE_URI;
  if (!baseURI) return res.sendStatus(500);

  const filePath = path.join(baseURI, form.filename);

  res.download(filePath, form.filename, (err) => {
    if (err) {
      console.error("Error sending file:", err);
      res.status(500).json({ message: "Error downloading file" });
    }
  });
};

export const viewProgressReport = (req: Request, res: Response) => {
  const { id } = req.params;
  const report = AcademicProfiles[0].progressReports.find(
    (r) => r.id === Number(id),
  );
  if (!report) {
    return res.status(404).json({ message: "Progress Report not found" });
  }

  if (!report.filename) {
    return res
      .status(404)
      .json({ message: "Progress Report file not available" });
  }

  const baseURI = process.env.PROGRESS_REPORT_BASE_URI;
  if (!baseURI) return res.sendStatus(500);

  const filePath = path.join(baseURI, report.filename);

  res.sendFile(filePath, (err) => {
    if (err) {
      console.error("Error sending file:", err);
      res.status(500).json({ message: "Error sending file" });
    }
  });
};
