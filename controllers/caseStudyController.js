import uploadImagesToCloudinary from "../utils/uploadImagesToCloudinary.js";
import slugify from "slugify";
import CaseStudy from "../models/caseStudyModel.js";
import createCaseStudyLink from '../utils/createCaseStudyLink.js'
export const addCaseStudyController = async (req, res) => {
  try {
    const { title, short_description, isFeatured } = req.body;
    const background_image_url = req.file
      ? await uploadImagesToCloudinary(req.file)
      : [];
    if (!title || !short_description) {
      return res
        .status(400)
        .json({ message: "All fields are requied", success: false });
    }
    const slug = slugify(title, { lower: true, strict: true });
    const link = createCaseStudyLink(slug);

    const caseStudy = new CaseStudy({
      title,
      short_description,
      slug,
      background_image_url: background_image_url[0],
      isFeatured,
      link
    });
    await caseStudy.save();

    return res
      .status(201)
      .json({ message: "Added successfully", success: true, data: caseStudy });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ error: error.message, message: "Internal server error!" });
  }
};

// Get All Case Studies
export const getAllCaseStudiesController = async (req, res) => {
  try {
    const caseStudies = await CaseStudy.find({}).lean();
    return res.status(200).json({
      success: true,
      message: "Case studies fetched successfully",
      data: caseStudies,
    });
  } catch (error) {
    console.error("Error fetching case studies:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Get Case Study by Slug
export const getCaseStudyBySlugController = async (req, res) => {
  try {
    const { slug } = req.params;

    const caseStudy = await CaseStudy.findOne({ slug }).lean();
    if (!caseStudy) {
      return res.status(404).json({
        success: false,
        message: "No case study found with this slug",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Case study fetched successfully",
      data: caseStudy,
    });
  } catch (error) {
    console.error("Error fetching case study:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const updateCaseStudyController = async (req, res) => {
  try {
    const { slug } = req.params;
    if (!slug) {
      return res
        .status(400)
        .json({ message: "Slug is required", success: false });
    }

    const caseStudy = await CaseStudy.findOne({ slug });
    if (!caseStudy) {
      return res
        .status(404)
        .json({ message: "Case study not found or slug is incorrect!", success: false });
    }

    const { title, short_description, isFeatured } = req.body || {};

    const background_image_url = req.file
      ? await uploadImagesToCloudinary(req.file)
      : [];

    // If nothing is passed, return error
    if (
      !title &&
      !short_description &&
      !isFeatured &&
      background_image_url.length === 0
    ) {
      return res
        .status(400)
        .json({ message: "At least one field is required", success: false });
    }

    // Update only provided fields
    if (title) {
      caseStudy.title = title;
      const newSlug = slugify(title, {lower: true, strict: true});
      caseStudy.slug = newSlug;
      caseStudy.link = createCaseStudyLink(newSlug);
    }
    if (short_description) caseStudy.short_description = short_description;
    if (typeof isFeatured !== "undefined") caseStudy.isFeatured = isFeatured;
    if (background_image_url.length > 0)
      caseStudy.background_image_url = background_image_url[0];

    await caseStudy.save();

    return res.status(200).json({
      message: "Updated successfully!",
      success: true,
      data: caseStudy,
    });
  } catch (error) {
    console.error("Error updating case study:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// DELETE:
export const deleteCaseStudyController = async (req, res) => {
  try {
    const { slug } = req.params;
    if (!slug) {
      return res
        .status(400)
        .json({ message: "slug is requried", success: false });
    }
    const caseStudy = await CaseStudy.findOneAndDelete({ slug });
    if (!caseStudy) {
      return res.status(404).json({
        message: "Not any case study is found with this slug",
        success: false,
      });
    }
    return res.status(200).json({
      message: "Deleted successfully",
      success: true,
      data: caseStudy,
    });
  } catch (error) {
    console.error("Error fetching case study:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
