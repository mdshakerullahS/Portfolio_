import Skill from "../models/skillModel.js";

export const getSkills = async (req, res) => {
  try {
    const skills = await Skill.find().sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      data: skills,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const addSkill = async (req, res) => {
  const { name, iconName } = req.body;
  try {
    const skill = new Skill({ name, iconName });
    await skill.save();
    return res.status(201).json({
      success: true,
      message: "Skill saved successfully",
      skill,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Skill couldn't save",
    });
  }
};

export const updateSkill = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, iconName } = req.body;

    const skill = await Skill.findById(id);
    if (!skill) {
      return res.status(404).json({
        success: false,
        message: "Skill not found",
      });
    }

    if (name === skill.name && iconName === skill.iconName) {
      return res.status(400).json({
        success: false,
        message: "No changes detected",
      });
    }

    skill.name = name || skill.name;
    skill.iconName = iconName || skill.iconName;

    const updatedSkill = await skill.save();

    return res.status(201).json({
      success: true,
      message: "Skill updated successfully",
      updateSkill,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Skill couldn't update",
    });
  }
};

export const deleteSkill = async (req, res) => {
  try {
    const { id } = req.params;

    const skill = await Skill.findById(id);

    if (!skill) {
      return res.status(404).json({
        success: false,
        message: "Skill not found",
      });
    }

    await skill.deleteOne();

    return res.status(204).json({
      success: true,
      message: "Skill deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Skill couldn't delete",
    });
  }
};
