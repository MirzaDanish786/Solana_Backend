import mongoose from "mongoose";

// Define the schema for a company
const companySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Company name is required"],
      trim: true,
    },
    logo_url: {
      type: String,
      required: [true, "Company logo URL is required"],
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt
  }
);

// Create the model
const Company_List = mongoose.model("Company_List", companySchema);

export default Company_List;
