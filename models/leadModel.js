import mongoose from "mongoose";

const leadSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters"],
      maxlength: [50, "Name cannot exceed 50 characters"],
    },

    phone: {
      type: String,
      required: [true, "Phone number is required"],
      match: [/^\+?[1-9]\d{9,13}$/, "Phone must be at least 10 digits and maximum 14 digits"],
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please use a valid email"],
    },

    sector: {
      type: String,
      required: [true, "Sector is required"],
      enum: [
        "Highway Accidents",
        "Industrial & Oil Rig",
        "Aviation & Flight",
        "Urban Mass Casualty",
      ],
    },

    other_information: {
      type: String,
      maxlength: [500, "Max 500 characters allowed"],
      trim: true,
    },
  },
  { timestamps: true },
);

export const Leads = mongoose.model("Lead", leadSchema);
