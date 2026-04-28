import express from "express";
import { getLeads, postLead } from "../controllers/leadController.js";
import { validate } from "../utils/validationError.js";
import { validateLeads } from "../utils/validateLeads.js";

const router = express.Router();

router.get("/", getLeads);
router.post("/", validateLeads, validate, postLead);

export default router;
