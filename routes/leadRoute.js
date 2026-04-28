import express from "express";
import {
  deleteLead,
  getLeads,
  postLead,
  updateLead,
} from "../controllers/leadController.js";
import { validate } from "../utils/validationError.js";
import { validateLeads } from "../utils/validateLeads.js";

const router = express.Router();

router.get("/", getLeads);
router.post("/", validateLeads, validate, postLead);
router.put("/:id", validateLeads, validate, updateLead);
router.delete("/:id", deleteLead);

export default router;
