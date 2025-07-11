import express from "express";
import multer from "multer";
import path from "node:path";
import crypto from "node:crypto";

import {
  getForms,
  getProgressReports,
  downloadForm,
  viewProgressReport,
} from "@/controllers/getDocument.controller.js";
import { uploadProgressReport } from "@/controllers/postDocument.controller.js";
import { validateParams } from "@/middlewares/validateParams.js";

const router = express.Router();

const formUploadPath = process.env.FORM_BASE_URI;
const progressReportUploadPath = process.env.PROGRESS_REPORT_BASE_URI;
if (!formUploadPath || !progressReportUploadPath) {
  throw new Error(
    `env BASE_URI not present-> formUploadsPath: ${formUploadPath}, progressReportUpload: ${progressReportUploadPath}`,
  );
}

const formStorage = multer.diskStorage({
  destination: process.env.FORM_BASE_URI,

  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const randomName = crypto.randomBytes(16).toString("hex");
    cb(null, `${randomName}${ext}`);
  },
});

const progressReportStorage = multer.diskStorage({
  destination: progressReportUploadPath,
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const randomName = crypto.randomBytes(16).toString("hex");
    cb(null, `${randomName}${ext}`);
  },
});

const formUpload = multer({ storage: formStorage });
const progressReportUpload = multer({ storage: progressReportStorage });

router.get(`/forms`, getForms);
router.get("/progress-reports", getProgressReports);

router.get("/forms/:id/download", downloadForm);
router.get("/progress-reports/:id/view", viewProgressReport);

router.post(
  "/progress-reports",
  progressReportUpload.single("report"),
  validateParams(["reportNumber"]),
  uploadProgressReport,
);

export default router;
