import { Admin } from "../models/adminModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const createAdmin = async (req, res, next) => {
  try {
    const { fullName, email, password } = req.body;
    const emailExists = await Admin.findOne({ email });

    if (emailExists) {
      const err = new Error("Email already exists");
      err.status = 400;
      return next(err);
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = await Admin.create({
      fullName,
      email,
      password: hashedPassword,
    });
    res.status(201).json({
      status: true,
      message: "Admin created successfully",
      data: admin,
    });
  } catch (error) {
    next(error);
  }
};

export const adminSignin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });
    if (!admin) {
      const err = new Error("Invalid email or password");
      err.status = 401;
      return next(err);
    }
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      const err = new Error("Invalid email or password");
      err.status = 401;
      return next(err);
    }

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET);
    res.cookie("token", token, { httpOnly: true, secure: true , });

    res.status(200).json({ status: true, message: "Admin logged in" });
  } catch (error) {
    next(error);
  }
};
