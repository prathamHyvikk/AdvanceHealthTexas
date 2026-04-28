import express from "express";
import { adminSignin, createAdmin } from "../controllers/adminController.js";
import { validateAdmin } from "../utils/validateLeads.js";
import { validate } from "../utils/validationError.js";

const router = express.Router();

router.post("/signup", validateAdmin, validate, createAdmin);
router.post("/signin", adminSignin);

export default router;
