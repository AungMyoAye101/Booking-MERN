
import { Request, Response } from "express";
import User from "../models/user.model";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { RequestWithUser } from "../types";
//Redister new user
export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ success: false, message: "User  already exist!" });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashPassword,
    });
    await newUser.save();
    const token = jwt.sign(
      { id: newUser._id, isAdmin: newUser.isAdmin },
      process.env.SECRET_KEY as string,
      { expiresIn: '1d' }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : "lax",
      maxAge: 1 * 24 * 60 * 60 * 1000
    });
    return res.status(201).json({ success: true, message: "User created successfully.", user: newUser });
  } catch (error) {
    if (error instanceof Error)
      return res.status(500).json({ success: false, message: error.message })
  }
};

//login
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found!" })
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.password
    );
    if (!isPasswordCorrect) {
      return res.status(400).json({ success: false, message: "Email or password does not match!" })
    }

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.SECRET_KEY as string,
      { expiresIn: '1d' }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 1 * 24 * 60 * 60 * 1000  // Restrict cookie sharing across origins
    });
    return res.status(201).json({ success: true, message: "Login successful", data: user });
  } catch (error) {
    if (error instanceof Error)
      return res.status(500).json({ success: false, message: error.message })
  }
};

export const logout = (req: Request, res: Response) => {
  try {

    res.clearCookie("token");
    return res.status(200).json({ success: true, message: "user logout" });
  } catch (error) {
    if (error instanceof Error)
      return res.status(500).json({ success: false, message: error.message })
  }
};


//check current user
export const currentUser = async (req: RequestWithUser, res: Response) => {
  try {
    const user = await User.findById(req.user?.id)
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" })
    }

    res.status(200).json({ success: true, message: "success", data: user })
  } catch (error) {
    if (error instanceof Error)
      res.status(500).json({ success: false, message: error.message })
  }
}


