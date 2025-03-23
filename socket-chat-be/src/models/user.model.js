import mongoose from "mongoose";
import { Schema } from "mongoose";

const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true,
      minlength: 7,
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    interests: {
      type: [String],
    },
    profilePic: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model("User", userSchema);

export default UserModel;
