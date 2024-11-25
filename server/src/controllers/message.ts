import { Request, Response } from "express";
import { cloudinary } from "../lib/cloudinary";
import Message from "../models/Message";

const getMessages = async (req: Request, res: Response) => {
  try {
    const { id: userToChatId } = req.params;

    if (!userToChatId) return res.status(500).json("Internal server error");

    const myId = req.body.user._id;

    if (!myId) return res.status(500).json("Internal server error");

    const messages = await Message.find({
      $or: [
        { senderId: userToChatId, receiverId: myId },
        { senderId: myId, receiverId: userToChatId },
      ],
    });

    return res.status(200).json({ messages });
  } catch (error) {
    console.error(error);

    res.status(500).json({ message: "Internal server error!" });
  }
};

const sendMessage = async (req: Request, res: Response) => {
  try {
    const { text, image } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.body.user._id;

    let imageUrl;
    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image, {
        folder: "realtime-chat",
      });
      imageUrl = uploadResponse.secure_url;
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      text,
      image: imageUrl,
    });

    await newMessage.save();

    // todo: realtime func - socket.io

    res.status(201).json(newMessage);
  } catch (error) {
    console.error(error);

    res.status(500).json({ message: "Internal server error!" });
  }
};

export { getMessages, sendMessage };
