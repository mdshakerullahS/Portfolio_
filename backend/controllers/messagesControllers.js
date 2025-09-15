import Message from "../models/messageModel.js";

export const saveMessage = async (req, res) => {
  const { name, email, subject, message } = req.body;

  try {
    const newMessage = new Message({
      name,
      email,
      subject,
      message,
    });

    await newMessage.save();
    return res.status(201).json({
      success: true,
      message: "Message sent",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to send message",
    });
  }
};

export const getMessages = async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      data: messages,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const deleteMessage = async (req, res) => {
  try {
    const { id } = req.params;

    const message = await Message.findById(id);

    if (!message) {
      return res.status(404).json({
        success: false,
        message: "Message not found",
      });
    }

    await message.deleteOne();

    return res
      .status(204)
      .json({ success: true, message: "Message deleted successfully" });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Message couldn't delete",
    });
  }
};
