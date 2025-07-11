import { getProgressReports } from "@/controllers/getDocument.controller.js";
import { approveReport, getAssignedScholars, rejectReport } from "@/controllers/supervisor.controller.js";
import { Router } from "express";

const router = Router();

router.get("/assigned-scholars", getAssignedScholars);
router.get("/progress-reports", getProgressReports);

router.post("/progress-reports/:id/approve", approveReport);
router.post("/progress-reports/:id/reject", rejectReport);


export default router;
