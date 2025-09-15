import express from "express";
import { verifyAdmin } from "../middlewares/auth.js";
import {
  addExperience,
  deleteExperience,
  getExperiences,
  updateExperience,
} from "../controllers/experiencesControllers";

const router = express.Router();

router.get("/experiences", getExperiences);
router.post("/experiences/add", verifyAdmin, addExperience);
router.put("/experiences/:id", verifyAdmin, updateExperience);
router.delete("/experiences/:id", verifyAdmin, deleteExperience);

export default router;
