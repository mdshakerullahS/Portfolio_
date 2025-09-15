import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: String,
    content: String,
    imageURL: String,
    cloudinaryID: String,
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("Blog", blogSchema);
