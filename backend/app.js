import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import ConnectDB from "./config/db.js";

dotenv.config();

import authRoutes from "./routes/authRoutes.js";
import skillsRoutes from "./routes/skillsRoutes.js";
import experiencesRoutes from "./routes/experiencesRoutes.js";
import projectsRoutes from "./routes/projectsRoutes.js";
import feedbacksRoutes from "./routes/feedbacksRoutes.js";
import blogsRoutes from "./routes/blogsRoutes.js";
import messagesRoutes from "./routes/messagesRoutes.js";

ConnectDB();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use("/api", authRoutes);
app.use("/api", skillsRoutes);
app.use("/api", experiencesRoutes);
app.use("/api", projectsRoutes);
app.use("/api", feedbacksRoutes);
app.use("/api", blogsRoutes);
app.use("/api", messagesRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`App is running on http://localhost:${PORT}`)
);
