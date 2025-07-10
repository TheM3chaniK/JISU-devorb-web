import { AcademicProfiles } from "@/test-data/phdscoller.js";
import { Request, Response } from "express";

export const getStdProfile = (req: Request, res: Response) => {
  const { id } = req.query;
  if (!id) {
    return res.status(200).json({ AcademicProfiles });
  }

  const profile = AcademicProfiles.find((x) => x.id === Number(id));

  res.status(200).json({ ...profile });
};
