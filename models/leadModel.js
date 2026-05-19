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

    doa: {
      type: Date,
      required: [true, "Date of Accident is required"],
    },

    phone: {
      type: String,
      required: [true, "Phone number is required"],
      match: [
        /^\+?[1-9]\d{9,13}$/,
        "Phone must be at least 10 digits and maximum 14 digits",
      ],
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please use a valid email"],
    },

    injury: {
      type: String,
      required: [true, "Type of Injury/Primary Concern is required"],
      enum: [
        "Whiplash",
        "Spinal Trauma",
        "Orthoepdic",
        "Concussion",
        "Muscle Soreness",
        "Headaches",
        "Other",
      ],
    },

    how_help: {
      type: String,
      maxlength: [500, "Max 500 characters allowed"],
      trim: true,
    },
  },
  { timestamps: true },
);

export const Leads = mongoose.model("Lead", leadSchema);
