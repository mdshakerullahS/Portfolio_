import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import ConnectDB from "./config/db.js";

dotenv.config();

import authRoutes from "./routes/authRoutes.js";
import messagesRoutes from "./routes/messagesRoutes.js";
import blogsRoutes from "./routes/blogsRoutes.js";
import projectsRoutes from "./routes/projectsRoutes.js";
import skillsRoutes from "./routes/skillsRoutes.js";

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

app.use("/api", messagesRoutes);
app.use("/api", blogsRoutes);
app.use("/api", projectsRoutes);
app.use("/api", skillsRoutes);
app.use("/api", authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`App is running on http://localhost:${PORT}`)
);
