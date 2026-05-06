import { Category } from "../models/categoryModel.js";

export const getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find();
    res.status(200).json({
      status: true,
      message: "Categories fetched successfully",
      data: categories,
    });
  } catch (error) {
    next(error);
  }
};

export const createCategory = async (req, res, next) => {
  try {
    const { name } = req.body;
    const categoryExist = await Category.findOne({ name });
    if (categoryExist) {
      const err = new Error("Category already exists");
      err.status = 400;
      return next(err);
    }
    const category = await Category.create({ name });
    res.status(201).json({
      status: true,
      message: "Category created successfully",
      data: category,
    });
  } catch (error) {
    next(error);
  }
};

export const updateCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const categoryExist = await Category.findOne({ name });
    if (categoryExist) {
      const err = new Error("Category already exists");
      err.status = 400;
      return next(err);
    }

    const validName = name.trim() !== "";
    if (!validName) {
      const err = new Error("Category name is required");
      err.status = 400;
      return next(err);
    }

    const category = await Category.findByIdAndUpdate(
      id,
      { name },
      { new: true },
    );
    res.status(200).json({
      status: true,
      message: "Category updated successfully",
      data: category,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const category = await Category.findByIdAndDelete(id);
    res.status(200).json({
      status: true,
      message: "Category deleted successfully",
      data: category,
    });
  } catch (error) {
    next(error);
  }
};
