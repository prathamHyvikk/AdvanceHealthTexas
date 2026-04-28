import { body } from "express-validator";

export const validateBlog = [
  body("image").notEmpty().exists().withMessage("Image is required"),
  body("title").notEmpty().exists().trim().withMessage("Title is required"),
  body("slug").notEmpty().exists().trim().withMessage("Slug is required"),
  body("short_description")
    .notEmpty()
    .exists()
    .trim()
    .withMessage("Short description is required"),
  body("description")
    .notEmpty()
    .exists()
    .trim()
    .withMessage("Description is required"),
];
