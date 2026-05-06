import express from "express";
import {
  createCategory,
  deleteCategory,
  getCategories,
  updateCategory,
} from "../controllers/categoryController.js";

const router = express.Router();

router.get("/", getCategories);
router.post("/", createCategory);
router.delete("/delete/:id", deleteCategory);
router.put("/update/:id", updateCategory);

export default router;
