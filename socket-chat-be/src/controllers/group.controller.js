import cloudinary from "../lib/cloudinary.js";
import MessageModel from "../models/message.model.js";
import GroupModel from "../models/group.model.js";
import UserModel from "../models/user.model.js";
import { io } from "../lib/socket.js";

export const createGroup = async (req, res) => {
  try {
    const { groupName, description, avatar, members = [] } = req.body;
    const createdBy = req.user._id;

    let avatarURL;
    if (avatar) {
      try {
        const uploaderRes = await cloudinary.uploader.upload(avatar);
        avatarURL = uploaderRes.secure_url;
      } catch (uploadError) {
        return res.status(500).json({ message: "Image upload failed" });
      }
    }
    const newGroup = new GroupModel({
      groupName: groupName,
      description: description,
      members: [...members, { userId: createdBy, role: "admin" }],
      avatar: avatarURL || "/sc_mini.svg",
      createdBy: createdBy,
    });
    await newGroup.save();
    return res.status(200).json(newGroup);
  } catch (error) {
    console.log(`Error: ${error.message}`);
    return res.status(500).json({ message: error.message });
  }
};

export const getAllGroups = async (req, res) => {
  try {
    const groups = await GroupModel.find({
      "members.userId": req.user._id,
      isDisabled: { $ne: true },
    }).populate("members.userId", "fullName, profilePic");
    return res.status(200).json(groups);
  } catch (error) {
    console.log(`Err: ${error.message}`);
    return res.status(500).json({ message: error.message });
  }
};

export const fetchusers = async (req, res) => {
  try {
    const { groupId } = req.query;
    const group = await GroupModel.findById(groupId);

    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    const membersIds = group.members.map((member) => member.userId.toString());

    const users = await UserModel.find({ _id: { $nin: membersIds } }).select(
      "fullName profilePic"
    );

    res.json(users);
  } catch (error) {
    console.log(`Err fetching users:${error.message}`);
    res.status(500).json({ message: error.message });
  }
};

export const addMemberToGroup = async (req, res) => {
  try {
    const { groupId, userId } = req.body;
    const group = await GroupModel.findById(groupId);

    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    const isAlreadyMember = group.members.some(
      (member) => member.userId.toString() == userId
    );
    if (isAlreadyMember) {
      return res.status(400).json({ message: "User os already a member" });
    }

    group.members.push({ userId, role: "member" });
    await group.save();

    res.status(200).json({ message: "Member added successfully", group });
  } catch (error) {
    console.log(`Err to add members:${error.message}`);
    res.status(500).json({ message: error.message });
  }
};

export const getGroupMembers = async (req, res) => {
  try {
    const { groupId } = req.query;

    if (!groupId) {
      return res.status(400).json({ message: "GroupID is required" });
    }
    const group = await GroupModel.findById(groupId).populate(
      "members.userId",
      "fullName profilePic"
    );

    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }
    return res.status(200).json(group.members);
  } catch (error) {
    console.error("Error fetching group members:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const removeMember = async (req, res) => {
  try {
    const { groupId, userId } = req.body;
    const group = await GroupModel.findById(groupId);

    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    const admin = group.members.find(
      (member) => member.userId.equals(req.user._id) && member.role === "admin"
    );
    if (!admin) {
      return res
        .status(403)
        .json({ message: "Only Group Admins can remove members" });
    }

    group.members = group.members.filter(
      (member) => !member.userId.equals(userId)
    );
    await group.save();
    res.status(200).json({ message: "Member removed successfully" });
  } catch (error) {
    console.error("Error removing member:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const disableGroup = async (req, res) => {
  try {
    const { groupId } = req.body;
    const group = await GroupModel.findByIdAndUpdate(groupId,
      { isDisabled: true },
      { new: true });

    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    const admin = group.members.find(
      (member) => member.userId.equals(req.user._id) && member.role === "admin"
    );

    if (!admin) {
      return res
        .status(403)
        .json({ message: "Only Group Admins can disable group" });
    }
    await GroupModel.findByIdAndDelete(groupId);
    return res.status(200).json({ message: "Group Disabled successfully" });
  } catch (error) {
    console.error("Error disabling group:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const sendGroupMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const { groupId } = req.params;
    const senderId = req.user._id;

    const group = await GroupModel.findById(groupId);
    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    let imageURL;
    if (image) {
      try {
        const uploaderRes = await cloudinary.uploader.upload(image);
        imageURL = uploaderRes.secure_url;
      } catch (uploadError) {
        return res.status(500).json({ message: "Image upload failed" });
      }
    }
    const newMessage = new MessageModel({
      senderId,
      groupId,
      text,
      image: imageURL || null,
    });
    await newMessage.save();

    const populatedMessage = await MessageModel.findById(newMessage._id).populate(
      "senderId",
      "fullName profilePic"
    );
    io.to(groupId).emit("newGroupMessage", populatedMessage);
    return res.status(201).json(populatedMessage);
  } catch (error) {
    console.log(`Err;${error.message}`);
    return res.status(500).json({ message: error.message });
  }
};

export const getGroupMessages = async (req, res) => {
  try {
    const { groupId } = req.params;
    const group = await GroupModel.findById(groupId);

    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }
    const messages = await MessageModel.find({ groupId })
      .populate("senderId", "fullName profilePic")
      .sort({
        createdAt: 1,
      });
    return res.status(200).json(messages);
  } catch (error) {
    console.log(`Error: ${error.message}`);
    return res.status(500).json({ message: error.message });
  }
};
