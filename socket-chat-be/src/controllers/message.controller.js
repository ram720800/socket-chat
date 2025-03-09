import cloudinary from "../lib/cloudinary.js";
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
    const signedInUser = req.user._id;

    const messages = await MessageModel.find({
      $or: [
        { senderId: signedInUser, reciverId: opponentId },
        { senderId: opponentId, reciverId: signedInUser },
      ],
    });

    return res.status(200).json(messages);
  } catch (error) {
    console.log(`Error: ${error.message}`);
    return res.status(500).json({ message: error.message });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const { id: reciverId } = req.params;
    const senderId = req.user._id;

    let imageURL;
    if (image) {
      const uploaderRes = cloudinary.uploader.upload(image);
      imageURL = (await uploaderRes).secure_url;
    }
    const newMessage = new MessageModel({
      senderId,
      reciverId,
      text,
      image: imageURL,
    });
      await newMessage.save();

      //socket.io

      res.status(201).json(newMessage);
  } catch (error) {
      console.log(`Error: ${error.message}`);
      return res.status(500).json({ message: error.message });
  }
};
