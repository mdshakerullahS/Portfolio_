import Feedback from "../models/feedbackModel.js";

export const saveFeedbacks = async (req, res) => {
  try {
    const feedback = new Feedback({
      name: req.body.name,
      email: req.body.email,
      role: req.body.role,
      company: req.body.company,
      feedback: req.body.feedback,
      avatarURL: req.file.path,
      cloudinaryID: req.file.filename,
    });

    await feedback.save();
    return res.status(201).json({
      success: true,
      message: "Feedback sent",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to send feedback",
    });
  }
};

export const getFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      data: feedbacks,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const approveFeedbacks = async (req, res) => {
  try {
    const { id } = req.params;

    const feedback = await Feedback.findById(id);
    if (!feedback) {
      return res.status(404).json({
        success: false,
        message: "Feedback not found",
      });
    }

    feedback.approved = !feedback.approved;
    await feedback.save();

    return res.status(201).json({
      success: true,
      message: "Feedback approved",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Feedback couldn't approve",
    });
  }
};

export const deleteFeedbacks = async (req, res) => {
  try {
    const { id } = req.params;

    const feedback = await Feedback.findById(id);

    if (!feedback) {
      return res.status(404).json({
        success: false,
        message: "Feedback not found",
      });
    }

    if (feedback.cloudinaryID) {
      await cloudinary.uploader.destroy(feedback.cloudinaryID);
    }

    await message.deleteOne();

    return res
      .status(204)
      .json({ success: true, message: "Feedback deleted successfully" });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Feedback couldn't delete",
    });
  }
};
