import { Leads } from "../models/leadModel.js";

// fetch all leads
export const getLeads = async (req, res, next) => {
  try {
    const leadData = await Leads.find();
    res.status(200).json({
      status: "success",
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
    res
      .status(201)
      .json({ status: "success", message: "Lead created successfully" });
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
      .json({ status: "success", message: "Lead deleted successfully" });
  } catch (error) {
    next(error);
  }
};
