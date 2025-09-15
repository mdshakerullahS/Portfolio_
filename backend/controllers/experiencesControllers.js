import Experience from "../models/experienceModel.js";

export const getExperiences = async (req, res) => {
  try {
    const experiences = await Experience.find().sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      data: experiences,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const addExperience = async (req, res) => {
  const {
    role,
    companyName,
    location,
    startDate,
    endDate,
    tasks,
    technologies,
  } = req.body;
  try {
    const experience = new Experience({
      role,
      companyName,
      location,
      startDate,
      endDate,
      tasks,
      technologies,
    });
    await experience.save();
    return res.status(201).json({
      success: true,
      message: "Experience saved successfully",
      experience,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Experience couldn't save",
    });
  }
};

export const updateExperience = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      role,
      companyName,
      location,
      startDate,
      endDate,
      tasks,
      technologies,
    } = req.body;

    const experience = await Experience.findById(id);
    if (!experience) {
      return res.status(404).json({
        success: false,
        message: "Experience not found",
      });
    }

    if (
      role === experience.role &&
      companyName === experience.companyName &&
      location === experience.location &&
      startDate === experience.startDate &&
      endDate === experience.endDate &&
      tasks === experience.tasks &&
      technologies === experience.technologies
    ) {
      return res.status(400).json({
        success: false,
        message: "No changes detected",
      });
    }

    experience.role = role || experience.role;
    experience.companyName = companyName || experience.companyName;
    experience.location = location || experience.location;
    experience.startDate = startDate || experience.startDate;
    experience.endDate = endDate || experience.endDate;
    experience.tasks = tasks || experience.tasks;
    experience.technologies = technologies || experience.technologies;

    const updatedExperience = await experience.save();

    return res.status(201).json({
      success: true,
      message: "Experience updated successfully",
      updatedExperience,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Experience couldn't update",
    });
  }
};

export const deleteExperience = async (req, res) => {
  try {
    const { id } = req.params;

    const experience = await Experience.findById(id);

    if (!experience) {
      return res.status(404).json({
        success: false,
        message: "Experience not found",
      });
    }

    if (experience.cloudinaryID) {
      await cloudinary.uploader.destroy(experience.cloudinaryID);
    }

    await experience.deleteOne();

    return res.status(204).json({
      success: true,
      message: "Experience deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Experience couldn't delete",
    });
  }
};
