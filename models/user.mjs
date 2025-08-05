import { timeStamp } from "console";
import mongoose from "mongoose";

const UserSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["user", "admin"], //there is a user access and an admin access
      default: "user",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
