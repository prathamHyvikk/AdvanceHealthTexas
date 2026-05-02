import { body } from "express-validator";

export const validateLeads = [
  body("name")
    .notEmpty()
    .exists()
    .withMessage("Name is required")
    .trim()
    .isLength({ min: 2 })
    .withMessage("Name must be at least 2 characters")
    .isLength({ max: 50 })
    .withMessage("Name cannot exceed 50 characters")
    .matches(/^[A-Za-z ]+$/)
    .withMessage("Name must contain only alphabetic characters")
    .escape(),
  body("phone")
    .notEmpty()
    .exists()
    .withMessage("Phone number is required")
    .trim()
    .isNumeric()
    .withMessage("Phone number must be numeric")
    .matches(/^\+?[1-9]\d{9,13}$/)
    .withMessage("Phone must be between 10 to 14 digits"),
  body("email")
    .notEmpty()
    .exists()
    .withMessage("Email is required")
    .trim()
    .isEmail()
    .withMessage("Please use a valid email"),
  body("sector")
    .notEmpty()
    .exists()
    .withMessage("Sector is required")
    .trim()
    .isIn([
      "Highway Accidents",
      "Industrial & Oil Rig",
      "Aviation & Flight",
      "Urban Mass Casualty",
    ])
    .withMessage("Sector must be select from the list"),
  body("other_information")
    .exists()
    .withMessage("Other information is required")
    .trim(),
];

export const validateAdmin = [
  body("fullName")
    .notEmpty()
    .exists()
    .withMessage("fullName is required")
    .trim()
    .isLength({ min: 2 })
    .withMessage("fullName must be at least 2 characters")
    .isLength({ max: 50 })
    .withMessage("fullName cannot exceed 50 characters")
    .matches(/^[A-Za-z ]+$/)
    .withMessage("fullName must contain only alphabetic characters")
    .escape(),
  body("email")
    .notEmpty()
    .exists()
    .withMessage("Email is required")
    .trim()
    .isEmail()
    .withMessage("Please use a valid email"),
  body("password")
    .notEmpty()
    .exists()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
];
