import mongoose from "mongoose";

const testimonialSchema = mongoose.Schema({
  name: String,
  role: String,
  company: String,
  testimonial: String,
  avatarURL: String,
  rating: String,
  date: String,
  socialLink: String,
});

export default mongoose.model("Testimonial", testimonialSchema);
