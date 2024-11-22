import { Request, Response } from "express";
import User from "../models/User";

const getUsers = async (req: Request, res: Response) => {
  try {
    const loggedInUserId = req.body.user._id;

    if (!loggedInUserId)
      return res.status(500).json({ message: "Internal server error!" });

    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");

    return res.status(200).json({ filteredUsers });
  } catch (error) {
    console.error(error);

    return res.status(500).json({ error: "Internal server error!" });
  }
};

export { getUsers };
