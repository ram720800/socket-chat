import cloudinary from "../lib/cloudinary.js";
import { io, getReceiverSocketId } from "../lib/socket.js";
import MessageModel from "../models/message.model.js";
import UserModel from "../models/user.model.js";

export const getUsersForSidebar = async (req, res) => {
  try {
    const signedInUser = req.user._id;
    const filteredUsers = await UserModel.find({
      _id: { $ne: signedInUser },
    }).select("--password");

    return res.status(200).json(filteredUsers);
  } catch (error) {
    console.log(`Error: ${error.message}`);
    return res.status(500).json({ message: error.message });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: opponentId } = req.params;
    const signedInUser = req.user?._id;

    if (!signedInUser || !opponentId) {
      return res.status(400).json({ message: "Invalid user data" });
    }

    const messages = await MessageModel.find({
      $or: [
        { senderId: signedInUser, receiverId: opponentId },
        { senderId: opponentId, receiverId: signedInUser },
      ],
    }).sort({ createdAt: 1 });
    return res.status(200).json(messages);
  } catch (error) {
    console.log(`Error: ${error.message}`);
    return res.status(500).json({ message: error.message });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

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
      receiverId,
      text,
      image: imageURL || null,
    });
    await newMessage.save();

    //socket.io
    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    res.status(201).json(newMessage);
  } catch (error) {
    console.log(`Error: ${error.message}`);
    return res.status(500).json({ message: error.message });
  }
};
