import mongoose from "mongoose";
import { Leads } from "../models/leadModel.js";
import sendMail from "../utils/sendMail.js";

// fetch all leads
export const getLeads = async (req, res, next) => {
  try {
    const leadData = await Leads.find();
    res.status(200).json({
      status: true,
      message: "Leads fetched successfully",
      data: leadData,
    });
  } catch (error) {
    next(error);
  }
};

// create lead
export const postLead = async (req, res, next) => {
  try {
    const { name, phone, email, sector, other_information } = req.body;
    const lead = await Leads.create({
      name,
      phone,
      email,
      sector,
      other_information,
    });

    await sendMail({
      to: "Pratham@hyvikk.com",
      subject: "New Lead Generated ",
      data: {
        name,
        phone,
        email,
        sector,
        other_information,
      },
    });

    res
      .status(201)
      .json({ status: true, message: "Lead created successfully" });
  } catch (error) {
    next(error);
  }
};

// delete lead
export const deleteLead = async (req, res, next) => {
  try {
    const { id } = req.params;
    const lead = await Leads.findByIdAndDelete(id);
    res
      .status(200)
      .json({ status: true, message: "Lead deleted successfully" });
  } catch (error) {
    next(error);
  }
};

// update lead
export const updateLead = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, phone, email, sector, other_information } = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      const err = new Error("Lead not found");
      err.status = 400;
      return next(err);
    }

    const lead = await Leads.findByIdAndUpdate(
      id,
      { name, phone, email, sector, other_information },
      { new: true, runValidators: true },
    );

    res
      .status(200)
      .json({ status: true, message: "Lead updated successfully" });
  } catch (error) {
    next(error);
  }
};
