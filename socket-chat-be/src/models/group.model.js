import mongoose from "mongoose";
import { Schema } from "mongoose";

const groupSchema = new Schema({
  groupName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: "",
  },
  avatar: {
    type: String,
    default: "/sc_mini.svg",
  },
  members: [
    {
      userId: { type: Schema.Types.ObjectId, ref: "User" },
      role: { type: String, enum: ["admin", "member"], default: "member" },
      joinedAt: { type: Date, default: Date.now },
    },
  ],
  createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: Date.now },
});

const GroupModel = mongoose.model("Group", groupSchema);
export default GroupModel;
