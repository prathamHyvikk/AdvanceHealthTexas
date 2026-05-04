import express from "express";
import upload from "../config/multer.js";
import {
  blogDetail,
  createBlog,
  deleteBlog,
  getBlogList,
  getBlogs,
  updateBlog,
} from "../controllers/blogController.js";
import { validateBlog } from "../utils/validateBlog.js";
import authenticateAdmin from "../middlewares/authenticateAdmin.js";

const router = express.Router();

router.get("/", authenticateAdmin, getBlogs);
router.get("/blogList", getBlogList);
router.get("/detail/:slug", blogDetail);
router.post("/create", validateBlog, upload.single("image"), createBlog);
router.delete("/delete/:id", authenticateAdmin, deleteBlog);
router.put(
  "/update/:id",
  authenticateAdmin,
  upload.single("image"),
  updateBlog,
);

export default router;
