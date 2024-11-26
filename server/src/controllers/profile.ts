import { Request, Response } from "express";
import { cloudinary } from "../lib/cloudinary.js";
import User from "../models/User.js";

const updateUserProfilePic = async (req: Request, res: Response) => {
  try {
    const { profilePic } = req.body;
    const userId = req.body.user._id;

    if (!profilePic) {
      return res.status(400).json({ message: "Profile pic is required" });
    }

    const uploadResponse = await cloudinary.uploader.upload(profilePic, {
      folder: "realtime-chat",
    });

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        profilePic: uploadResponse.secure_url,
      },
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);

    return res.status(500).json({ message: "Internal server error", error });
  }
};

export { updateUserProfilePic };
