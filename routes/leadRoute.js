import express from "express";
import {
  deleteLead,
  getLeads,
  postLead,
  updateLead,
} from "../controllers/leadController.js";
import { validate } from "../utils/validationError.js";
import { validateLeads } from "../utils/validateLeads.js";
import authenticateAdmin from "../middlewares/authenticateAdmin.js";

const router = express.Router();

router.get("/",authenticateAdmin, getLeads);
router.post("/",authenticateAdmin, validateLeads, validate, postLead);
router.put("/:id",authenticateAdmin, validateLeads, validate, updateLead);
router.delete("/:id",authenticateAdmin, deleteLead);

export default router;
