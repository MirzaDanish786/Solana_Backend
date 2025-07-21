import Company_List from "../models/companiesListModel.js";
import uploadImagesToCloudinary from "../utils/uploadImagesToCloudinary.js";
import mongoose from "mongoose";
// POST
export const addCompanyController = async (req, res) => {
  try {
    const { name } = req.body;
    const logo_url = req.file ? await uploadImagesToCloudinary(req.file) : [];
    if (!name || logo_url.length === 0) {
      return res
        .status(400)
        .json({ message: "All fields are required", success: false });
    }
    const company = new Company_List({ name, logo_url: logo_url[0] });
    await company.save();
    return res
      .status(201)
      .json({ message: "Added successfully", success: true, data: company });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ error: error.message, message: "Internal server error!" });
  }
};

// GET
export const getCompanyController = async (req, res) => {
  try {
    const comapanies = await Company_List.find({});
    return res.status(200).json({ comapanies, success: true });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ error: error.message, message: "Internal server error!" });
  }
};

// UPDATE:
export const updateCompanyController = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Valid ID is required",
        success: false,
      });
    }
    const { name } = req.body;
    const logo_url = req.file ? await uploadImagesToCloudinary(req.file) : [];

    const company = await Company_List.findById(id);
    if (!company) {
      return res
        .status(404)
        .json({ message: "Company not found", success: false });
    }
    if (name) company.name = name;
    if (logo_url && logo_url.length > 0) company.logo_url = logo_url[0];

    await company.save();
    return res
      .status(200)
      .json({ message: "Updated successfully", success: true, data: company });
  } catch (error) {
    return res
      .status(500)
      .json({ error: error.message, message: "Internal server error!" });
  }
};

// Delete:
export const deleteCompanyController = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Valid ID is required",
        success: false,
      });
    }
    const company = await Company_List.findByIdAndDelete(id);
    if (!company) {
      return res
        .status(404)
        .json({ message: "Company not found", success: false });
    }
    return res
      .status(200)
      .json({ message: "Deleted Successfully", success: true, data: company });
  } catch (error) {
    return res
      .status(500)
      .json({ error: error.message, message: "Internal server error!" });
  }
};
