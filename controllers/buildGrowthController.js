import BuildGrowth from "../models/buildGrowthModel.js";
import uploadImagesToCloudinary from "../utils/uploadImagesToCloudinary.js";
import slugify from "slugify";
export const addBuildGrowthController = async (req, res) => {
  try {
    const { title, desc } = req.body || {};
    const bg_image_url = req.files?.bg_image
      ? await uploadImagesToCloudinary(req.files?.bg_image)
      : [];
    const logo_url = req.files?.logo
      ? await uploadImagesToCloudinary(req.files?.logo)
      : [];
    if (!title || !desc || bg_image_url.length === 0 || logo_url.length === 0) {
      return res
        .status(400)
        .json({ message: "All fields are required!", success: false });
    }
    const slug = slugify(title, { strict: true, lower: true });
    const buildGrowth = new BuildGrowth({
      title,
      desc,
      slug,
      bg_image_url: bg_image_url[0],
      logo_url: logo_url[0],
    });
    await buildGrowth.save();

    return res.status(201).json({
      message: "Successfully Created!",
      success: true,
      data: buildGrowth,
    });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ error: error.message, message: "Internal server error!" });
  }
};
// GET
export const getBuildGrowthController = async (req, res) => {
  try {
    const buildGrowth = await BuildGrowth.find({}).lean();
    return res.status(200).json(buildGrowth);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      error: error.message,
      message: "Internal server error!",
    });
  }
};

// UPDATE:
export const updateBuildGrowthController = async (req, res) => {
  try {
    const { slug } = req.params;
    const { title, desc } = req.body || {};
    const bg_image_url = req.files?.bg_image
      ? await uploadImagesToCloudinary(req.files?.bg_image)
      : [];
    const logo_url = req.files?.logo
      ? await uploadImagesToCloudinary(req.files?.logo)
      : [];

    const buildGrowth = await BuildGrowth.findOne({ slug });
    if (!buildGrowth) {
      return res.status(404).json({ message: "Not found or incorrect slug" });
    }
    if (title) {
      buildGrowth.title = title;
      const newSlug = slugify(title, { lower: true, strict: true });
      buildGrowth.slug = newSlug;
    }
    if (desc) buildGrowth.desc = desc;
    if (bg_image_url && bg_image_url.length !== 0)
      buildGrowth.bg_image_url = bg_image_url[0];
    if (logo_url && logo_url.length !== 0) buildGrowth.logo_url = logo_url[0];
    if (
      !title &&
      !desc &&
      (!bg_image_url || bg_image_url.length === 0) &&
      (!logo_url || logo_url.length === 0)
    ) {
      return res
        .status(400)
        .json({ message: "At least one field is required!", success: false });
    }

    await buildGrowth.save();

    return res.status(200).json({
      message: "Updated successfully",
      success: true,
      data: buildGrowth,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      error: error.message,
      message: "Internal server error!",
    });
  }
};

export const deleteBuildGrowthController = async (req, res) => {
  try {
    const { slug } = req.params;
    if (!slug) {
      return res
        .status(400)
        .json({ message: "Slug is required", success: false });
    }
    const buildGrowth = await BuildGrowth.findOneAndDelete({ slug });
    if (!buildGrowth) {
      return res.status(404).json({ message: "Not found", success: false });
    }
    return res.status(200).json({
      message: "Deleted successfully",
      success: true,
      data: buildGrowth,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      error: error.message,
      message: "Internal server error!",
    });
  }
};

export const getSingleBuildGrowthController = async (req, res) => {
  try {
    const { slug } = req.params;

    if (!slug) {
      return res
        .status(400)
        .json({ message: "Slug is required!", success: false });
    }

    const buildGrowth = await BuildGrowth.findOne({ slug }).lean();

    if (!buildGrowth) {
      return res
        .status(404)
        .json({ message: "No entry found with this slug", success: false });
    }

    return res.status(200).json({
      message: "Successfully fetched",
      success: true,
      data: buildGrowth,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      error: error.message,
      message: "Internal server error!",
      success: false,
    });
  }
};

