import { Blog } from "../models/blogModel.js";
import sanitizeHtml from "sanitize-html";

// create blog
export const createBlog = async (req, res, next) => {
  try {
    const {
      title,
      short_description,
      description,
      meta_description,
      meta_schema,
    } = req.body;

    // multer gives
    const image = req.file ? req.file.filename : null;
    const slug = title.replaceAll(" ", "-");

    const cleanHTML = (html) => {
      return sanitizeHtml(html);
    };

    const blog = await Blog.create({
      image,
      title,
      slug,
      short_description,
      description: cleanHTML(description),
      meta_description: cleanHTML(meta_description),
      meta_schema: cleanHTML(meta_schema),
    });

    res.status(201).json({
      status: "success",
      message: "Blog created successfully",
      blog,
    });
  } catch (error) {
    next(error);
  }
};

// fetch all blogs
export const getBlogs = async (req, res, next) => {
  try {
    const blogData = await Blog.find().lean();
    res.status(200).json({
      status: "success",
      message: "Blogs fetched successfully",
      data: blogData,
    });
  } catch (error) {
    next(error);
  }
};
