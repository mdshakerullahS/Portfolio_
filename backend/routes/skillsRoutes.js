import express from "express";
import { verifyAdmin } from "../middlewares/auth.js";
import {
  addSkill,
  deleteSkill,
  getSkills,
  updateSkill,
} from "../controllers/skillsControllers.js";

const router = express.Router();

router.get("/skills", getSkills);
router.post("/skills/add", verifyAdmin, addSkill);
router.put("/skills/:id", verifyAdmin, updateSkill);
router.delete("/skills/:id", verifyAdmin, deleteSkill);

export default router;
