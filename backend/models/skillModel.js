import mongoose from "mongoose";

const skillSchema = new mongoose.Schema({
  name: String,
  iconName: String,
});

export default mongoose.model("Skill", skillSchema);
