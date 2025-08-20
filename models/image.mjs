import mongoose from "mongoose";
import User from "./user.mjs";

const imageSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
  },

  publicId: {
    type: String,
    required: true,
  },

  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
  },
});

const Image = mongoose.model("Image", imageSchema);

export default Image;
