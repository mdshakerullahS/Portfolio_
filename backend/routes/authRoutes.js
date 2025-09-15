import express from "express";
import { login, logout, verifyToken } from "../controllers/authControllers.js";

const router = express.Router();

router.post("/login", login);
router.get("/verify-token", verifyToken);
router.post("/logout", logout);

export default router;
