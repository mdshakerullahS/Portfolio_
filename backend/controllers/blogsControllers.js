import Blog from "../models/blogModel.js";
import { v2 as cloudinary } from "cloudinary";

export const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      data: blogs,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const createBlog = async (req, res) => {
  try {
    const blog = new Blog({
      title: req.body.title,
      content: req.body.content,
      imageURL: req.file.path,
      cloudinaryID: req.file.filename,
    });
    await blog.save();
    return res.status(201).json({
      success: true,
      message: "Blog saved successfully",
      blog,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Blog couldn't save",
    });
  }
};

export const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;

    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    if (!req.file && title === blog.title && content === blog.content) {
      return res.status(400).json({
        success: false,
        message: "No changes detected",
      });
    }

    if (req.file) {
      if (blog.cloudinaryID) {
        await cloudinary.uploader.destroy(blog.cloudinaryID);

        blog.imageURL = req.file.path;
        blog.cloudinaryID = req.file.filename;
      }
    }

    if (title) blog.title = title;
    if (content) blog.content = content;

    const updatedBlog = await blog.save();

    return res.status(201).json({
      success: true,
      message: "Blog updated successfully",
      updatedBlog,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Blog couldn't update",
    });
  }
};

export const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;

    const blog = await Blog.findById(id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    if (blog.cloudinaryID) {
      await cloudinary.uploader.destroy(blog.cloudinaryID);
    }

    await blog.deleteOne();

    return res
      .status(204)
      .json({ success: true, message: "Blog deleted successfully" });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Blog couldn't delete",
    });
  }
};
