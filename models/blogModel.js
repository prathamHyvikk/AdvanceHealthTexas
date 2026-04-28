import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  image: {
    type: String,
    required: [true, "Image is required"],
  },
  title: {
    type: String,
    required: [true, "Title is required"],
  },
  slug: {
    type: String,
    unique: [true, "Slug must be unique"],
  },
  short_description: {
    type: String,
    required: [true, "Short description is required"],
  },
  description: {
    type: String,
    required: [true, "Description is required"],
  },
  meta_description: {
    type: String,
    // required: [true, "Meta description is required"],
  },
  meta_schema: {
    type: String,
    // required: [true, "Meta schema is required"],
  },
});

export const Blog = mongoose.model("Blog", blogSchema);
