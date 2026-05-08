import { Blog } from "../models/blogModel.js";
import sanitizeHtml from "sanitize-html";
import fs from "fs";
import path from "path";

// fetch all blogs for backend
export const getBlogs = async (req, res, next) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 2;

    const skipIndex = (page - 1) * limit;

    const [blogData, totalBlogs] = await Promise.all([
      Blog.find().skip(skipIndex).limit(limit).lean().populate("category"),
      Blog.countDocuments(),
    ]);

    res.status(200).json({
      status: true,
      message: "Blogs fetched successfully",
      data: blogData,
      totalBlogs,
    });
  } catch (error) {
    next(error);
  }
};

// Blog list for frontEnd
export const getBlogList = async (req, res, next) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const skipIndex = (page - 1) * limit;

    const [blogData, totalBlogs] = await Promise.all([
      Blog.find()
        .skip(skipIndex)
        .limit(limit)
        .select({
          image: 1,
          title: 1,
          slug: 1,
          short_description: 1,
          _id: 1,
          category: 1,
        })
        .lean()
        .populate("category"),
      Blog.countDocuments(),
    ]);

    res.status(200).json({
      status: true,
      message: "Blogs fetched successfully",
      data: blogData,
      totalBlogs,
    });
  } catch (error) {
    next(error);
  }
};

// create blog
export const createBlog = async (req, res, next) => {
  try {
    const {
      title,
      category,
      short_description,
      description,
      meta_description,
      meta_schema,
    } = req.body;

    // multer gives
    const image = req.file ? req.file.filename : req.body.existingImage || null;
    const slug = title.replaceAll(" ", "-");

    const parsedSchema = JSON.parse(meta_schema);
    const parsedMetaDescription = JSON.parse(meta_description);
    const blog = await Blog.create({
      image,
      title,
      slug,
      category,
      short_description,
      description,
      meta_description: parsedMetaDescription,
      meta_schema: parsedSchema,
    });

    res.status(201).json({
      status: true,
      message: "Blog created successfully",
      blog,
    });
  } catch (error) {
    next(error);
  }
};

// update blog
export const updateBlog = async (req, res, next) => {
  try {
    const { id } = req.params;

    const blogExists = await Blog.findById(id);
    if (!blogExists) {
      const err = new Error("Blog not found");
      err.status = 404;
      return next(err);
    }

    const {
      title,
      category,
      short_description,
      description,
      meta_description,
      meta_schema,
    } = req.body;

    let image = blogExists.image;
    const parsedSchema = JSON.parse(meta_schema);
    const parsedMetaDescription = JSON.parse(meta_description);

    if (req.file) {
      if (blogExists.image) {
        const oldPath = path.join(
          path.resolve(),
          "public",
          "uploads",
          blogExists.image,
        );
        if (fs.existsSync(oldPath)) {
          fs.unlinkSync(oldPath);
        }
      }

      // Set new image
      image = req.file.filename;
    }

    const slug = title.replaceAll(" ", "-");

    await Blog.findByIdAndUpdate(
      id,
      {
        image,
        title,
        slug,
        category,
        short_description,
        description,
        meta_description: parsedMetaDescription,
        meta_schema: parsedSchema,
      },
      { new: true, runValidators: true },
    );

    res.status(200).json({
      status: true,
      message: "Blog updated successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const blogDetail = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const blog = await Blog.findOne({ slug });
    if (!blog) {
      const err = new Error("Blog not found");
      err.status = 404;
      return next(err);
    }
    res.status(200).json({
      status: true,
      message: "Blog fetched successfully",
      data: blog,
    });
  } catch (error) {
    next(error);
  }
};

// delete blog
export const deleteBlog = async (req, res, next) => {
  try {
    const { id } = req.params;
    const blogExists = await Blog.findById(id);
    if (!blogExists) {
      const err = new Error("Blog not found");
      err.status = 404;
      return next(err);
    }

    if (blogExists.image) {
      const imagePath = path.join(
        path.resolve(),
        "public",
        "uploads",
        blogExists.image,
      );
      try {
        fs.unlinkSync(imagePath);
      } catch (error) {
        next(error);
      }
    }
    const blog = await Blog.findByIdAndDelete(id);
    res
      .status(200)
      .json({ status: true, message: "Blog deleted successfully" });
  } catch (error) {
    next(error);
  }
};
