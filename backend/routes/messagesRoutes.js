import express from "express";
import { verifyAdmin } from "../middlewares/auth.js";
import { validateMessage } from "../middlewares/validateMessages.js";
import {
  deleteMessage,
  getMessages,
  saveMessage,
} from "../controllers/messagesControllers.js";

const router = express.Router();

router.post("/messages/save", validateMessage, saveMessage);
router.get("/messages", verifyAdmin, getMessages);
router.delete("/messages/:id", verifyAdmin, deleteMessage);

export default router;
