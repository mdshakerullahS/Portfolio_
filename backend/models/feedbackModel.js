import mongoose from "mongoose";

const feedbackSchema = mongoose.Schema(
  {
    name: String,
    email: String,
    company: String,
    role: String,
    feedback: String,
    avatarURL: String,
    cloudinaryID: String,
    approved: { type: Boolean, default: false },
  },
  { timeStamps: true }
);

export default mongoose.model("Feedback", feedbackSchema);
