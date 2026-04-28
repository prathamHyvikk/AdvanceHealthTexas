import { Leads } from "../models/leadModel.js";

// fetch all leads
export const getLeads = async (req, res, next) => {
  try {
    const leadData = await Leads.find();
    res.status(200).json({
      status: "success",
      msg: "Leads fetched successfully",
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
      .json({ status: "success", msg: "Lead created successfully" });
  } catch (error) {
    next(error);
  }
};


