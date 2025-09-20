import express from "express";
import { verifyAdmin } from "../middlewares/auth.js";
import { uploadFeedbackAvatar } from "../middlewares/multer.js";
import {
  saveFeedbacks,
  getFeedbacks,
  deleteFeedbacks,
  approveFeedbacks,
} from "../controllers/feedbacksControllers.js";

const router = express.Router();

router.get("/feedbacks", getFeedbacks);
router.post(
  "/feedbacks/save",
  uploadFeedbackAvatar.single("image"),
  saveFeedbacks
);
router.put("/feedbacks/:id", verifyAdmin, approveFeedbacks);
router.delete("/feedbacks/:id", verifyAdmin, deleteFeedbacks);

export default router;
