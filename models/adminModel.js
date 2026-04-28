import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, "fullName is required"],
    trim: true,
    minlength: [2, "fullName must be at least 2 characters"],
    maxlength: [50, "fullName cannot exceed 30 characters"],
  },

  email: {
    type: String,
    required: [true, "Email is required"],
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, "Please use a valid email"],
    unique: [true, "Email already exists"],
  },

  password: {
    type: String,
    required: [true, "Password is required"],
    trim: true,
    minlength: [6, "Password must be at least 6 characters"],
  },
});

export const Admin = mongoose.model("Admin", adminSchema);
