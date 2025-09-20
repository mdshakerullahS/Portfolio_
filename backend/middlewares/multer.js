import cloudinary from "../config/cloudinary.js";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";

const blogStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "portfolio/blogs",
    public_id: (req, file) =>
      `${Date.now()}_${file.originalname
        .split(".")[0]
        .replace(/\s+/g, "-")
        .toLowerCase()}`,
    transformation: [{ quality: "auto", fetch_format: "auto" }],
  },
});

const projectStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "portfolio/projects",
    public_id: (req, file) =>
      `${Date.now()}_${file.originalname
        .split(".")[0]
        .replace(/\s+/g, "-")
        .toLowerCase()}`,
    transformation: [{ quality: "auto", fetch_format: "auto" }],
  },
});
const feedbackStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "portfolio/feedbacks",
    public_id: (req, file) =>
      `${Date.now()}_${file.originalname
        .split(".")[0]
        .replace(/\s+/g, "-")
        .toLowerCase()}`,
    transformation: [{ quality: "auto", fetch_format: "auto" }],
  },
});

export const uploadBlogImage = multer({ storage: blogStorage });
export const uploadProjectImage = multer({ storage: projectStorage });
export const uploadFeedbackAvatar = multer({ storage: feedbackStorage });
