import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Category name is required"],
    unique: [true, "Category name must be unique"],
    trim: true,
    default: "",
  },
});

export const Category = mongoose.model("Category", categorySchema);