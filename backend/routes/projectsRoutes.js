import express from "express";
import { verifyAdmin } from "../middlewares/auth.js";
import { uploadProjectImage } from "../middlewares/multer.js";
import {
  addProject,
  deleteProject,
  getProjects,
  updateProject,
} from "../controllers/projectsControllers.js";

const router = express.Router();

router.get("/projects", getProjects);
router.post(
  "/projects/add",
  verifyAdmin,
  uploadProjectImage.single("image"),
  addProject
);
router.put(
  "/projects/:id",
  verifyAdmin,
  uploadProjectImage.single("image"),
  updateProject
);
router.delete("/projects/:id", verifyAdmin, deleteProject);

export default router;
