import Project from "../models/projectModel.js";
import { v2 as cloudinary } from "cloudinary";

export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      data: projects,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const addProject = async (req, res) => {
  try {
    const project = new Project({
      title: req.body.title,
      description: req.body.description,
      imageURL: req.file.path,
      cloudinaryID: req.file.filename,
    });
    await project.save();
    return res.status(201).json({
      success: true,
      message: "Project saved successfully",
      project,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Project couldn't save",
    });
  }
};

export const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, featured } = req.body;

    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    if (
      !req.file &&
      title === project.title &&
      description === project.description &&
      (featured === undefined || featured === project.featured)
    ) {
      return res.status(400).json({
        success: false,
        message: "No changes detected",
      });
    }

    if (req.file && project.cloudinaryID) {
      await cloudinary.uploader.destroy(project.cloudinaryID);

      project.imageURL = req.file.path;
      project.cloudinaryID = req.file.filename;
    }

    project.title = title || project.title;
    project.description = description || project.description;
    project.featured = featured || project.featured;

    const updatedProject = await project.save();

    return res.status(201).json({
      success: true,
      message: "Project updated successfully",
      updatedProject,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: "Project couldn't update",
    });
  }
};

export const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;

    const project = await Project.findById(id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    if (project.cloudinaryID) {
      await cloudinary.uploader.destroy(project.cloudinaryID);
    }

    await project.deleteOne();

    return res
      .status(204)
      .json({ success: true, message: "Project deleted successfully" });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "project couldn't delete",
    });
  }
};
