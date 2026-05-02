import express from "express";
import {
  adminSignin,
  createAdmin,
  verifyAdmin,
} from "../controllers/adminController.js";
import { validateAdmin } from "../utils/validateLeads.js";
import { validate } from "../utils/validationError.js";
import authenticateAdmin from "../middlewares/authenticateAdmin.js";

const router = express.Router();

router.post("/signup", validateAdmin, validate, createAdmin);
router.post("/signin", adminSignin);
router.post("/verify", authenticateAdmin, verifyAdmin);

export default router;
