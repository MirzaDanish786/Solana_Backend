import mongoose from "mongoose";

const buildGrowthSchema = new mongoose.Schema(
  {
    bg_image_url: {
      type: String,
      required: [true, "Image is required!"],
    },
    logo_url: {
      type: String,
      required: [true, "Logo is required!"],
    },
    title: {
      type: String,
      required: [true, "Title is required!"],
      trim: true,
      unique: [true, "Title must be unique"],
    },
    desc: {
      type: String,
      required: [true, "Description is required!"],
      trim: true,
    },
    slug: {
      type: String,
      required: [true, "Description is required!"],
      trim: true,
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt fields
  }
);

const BuildGrowth = mongoose.model("BuildGrowth", buildGrowthSchema);
export default BuildGrowth;
