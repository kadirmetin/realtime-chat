import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import validator from "validator";
import User from "../models/User";
import { generateToken } from "../utils/generateToken";

const signUp = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  try {
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Please fill in all fields." });
    }

    const isEmailValid = (email: string) => validator.isEmail(email);

    if (!isEmailValid(email)) {
      return res
        .status(400)
        .json({ message: "Please enter a valid email address." });
    }

    const isExistingUser = await User.findOne({ email });

    if (isExistingUser)
      return res.status(400).json({ message: "This email address is in use." });

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "The password cannot be less than 6 characters." });
    }

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    if (newUser) {
      generateToken(newUser._id, res);

      await newUser.save();

      res
        .status(201)
        .json({ message: "User created successfully.", _id: newUser._id });
    } else {
      res.status(500).json({ message: "Internal server error" });
    }
  } catch (error) {
    console.error(error);

    return res.status(500).json({ message: "Internal server error", error });
  }
};

const signIn = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ message: "Please fill in all fields." });
    }

    const isEmailValid = (email: string) => validator.isEmail(email);

    if (!isEmailValid(email)) {
      return res
        .status(400)
        .json({ message: "Please enter a valid email address." });
    }

    const isExistingUser = await User.findOne({ email });

    if (!isExistingUser) {
      return res
        .status(400)
        .json({ message: "Invalid email address or password." });
    }

    const isPasswordMatch = await bcrypt.compare(
      password,
      isExistingUser.password
    );

    if (!isPasswordMatch) {
      return res
        .status(401)
        .json({ message: "Invalid email address or password." });
    }

    generateToken(isExistingUser._id, res);

    res.status(200).json({
      _id: isExistingUser._id,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "An error occurred during the login process." });
  }
};

const logout = async (req: Request, res: Response) => {
  try {
    res.cookie("jwt", "", {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV !== "DEVELOPMENT",
      maxAge: 0,
    });

    res.status(200).json({ message: "Logged out successfuly." });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "An error occurred during the logout process." });
  }
};

export { logout, signIn, signUp };
