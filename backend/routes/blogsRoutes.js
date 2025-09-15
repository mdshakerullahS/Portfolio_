import express from "express";
import { verifyAdmin } from "../middlewares/auth.js";
import { uploadBlogImage } from "../middlewares/multer.js";
import {
  createBlog,
  deleteBlog,
  getBlogs,
  updateBlog,
} from "../controllers/blogsControllers.js";

const router = express.Router();

router.get("/blogs", getBlogs);
router.post(
  "/blogs/create",
  verifyAdmin,
  uploadBlogImage.single("image"),
  createBlog
);
router.put(
  "/blogs/:id",
  verifyAdmin,
  uploadBlogImage.single("image"),
  updateBlog
);
router.delete("/blogs/:id", verifyAdmin, deleteBlog);

export default router;
