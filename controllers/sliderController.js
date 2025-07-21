import Slider from "../models/sliderModel.js";
import mongoose from "mongoose";
import uploadImagesToCloudinary from "../utils/uploadImagesToCloudinary.js";
// add:
export const addSliderController = async (req, res) => {
  try {
    const { heading, title, desc } = req.body;
    const image_url = req.file ? await uploadImagesToCloudinary(req.file) : [];
    if (!heading || !title || !desc || !image_url) {
      return res
        .status(400)
        .json({ message: "All fields are required", success: false });
    }
    const slider = new Slider({
      heading,
      title,
      desc,
      image_url: image_url[0],
    });
    await slider.save();
    return res
      .status(201)
      .json({
        message: "Slider is successfully added!",
        success: true,
        data: slider,
      });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ error: error.message, message: "Internal server error!" });
  }
};

// get:
export const getSliderController = async (req, res) => {
  try {
    const sliders = await Slider.find({});
    return res.status(200).json(sliders);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error!" });
  }
};
// update:
export const updateSliderController = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Valid ID is required",
        success: false,
      });
    }

    const { heading, title, desc } = req.body || {};

    const imageUrls = req.file ? await uploadImagesToCloudinary(req.file) : [];

    const isNothingToUpdate = !heading && !title && !desc && imageUrls.length === 0;

    if (isNothingToUpdate) {
      return res.status(400).json({
        message:
          "At least one field (title, description, or image) is required",
        success: false,
      });
    }

    const slider = await Slider.findById(id);
    if (!slider) {
      return res.status(404).json({
        message: "Slider not found",
        success: false,
      });
    }

    if(heading) slider.heading = heading;
    if (title) slider.title = title;
    if (desc) slider.desc = desc;
    if (imageUrls.length > 0) slider.image_url = imageUrls[0];

    await slider.save();

    return res.status(200).json({
      message: "Updated successfully!",
      success: true,
      slider,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error!",
      error: error.message,
    });
  }
};

// delete
export const deleteSliderController = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({
        message: "ID is required",
        success: false,
      });
    }
    const slider = await Slider.findByIdAndDelete(id);
    if (!slider) {
      return res
        .status(404)
        .json({ message: "Slider not found", success: false });
    }
    return res
      .status(200)
      .json({ message: "Deleted successfully!", success: true, slider });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error!" });
  }
};
