import mongoose from "mongoose";

const experienceSchema = mongoose.Schema({
  role: String,
  companyName: String,
  location: String,
  startDate: String,
  endDate: String,
  tasks: Array,
  technologies: Array,
});

export default mongoose.model("Experience", experienceSchema);
