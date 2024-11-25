import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User";

const protectRoute = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized - No token provided!" });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    } catch (err) {
      return res
        .status(401)
        .json({ message: "Unauthorized - Invalid token!", err });
    }

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    req.body.user = user;
    next();
  } catch (error) {
    console.error(error);

    return res.status(500).json({ message: "Internal server error", error });
  }
};

export { protectRoute };
