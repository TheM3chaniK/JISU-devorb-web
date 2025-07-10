import { getStdProfile } from "@/controllers/phdschollerControler.js";
import { Router } from "express";

const router = Router();

router.get("/get-profile", getStdProfile);



export default router;
