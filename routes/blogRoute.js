import express from "express";
import upload from "../config/multer.js";
import { createBlog, getBlogs } from "../controllers/blogController.js";
import { validateBlog } from "../utils/validateBlog.js";

const router = express.Router();

router.get("/",validateBlog, getBlogs);
router.post("/create", upload.single("image"), createBlog);

export default router;
