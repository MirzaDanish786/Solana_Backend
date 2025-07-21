import ThrivingCommunity from "../models/thrivingCommunityModel.js";
import mongoose from "mongoose";
import uploadImagesToCloudinary from "../utils/uploadImagesToCloudinary.js";
export const addCommunityController = async (req, res) => {
  try {
    const { hacker_participants, developers } = req.body;
    const community_images_url = req.files?.length
      ? await uploadImagesToCloudinary(req.files)
      : [];
    if (
      hacker_participants === undefined ||
      developers === undefined ||
      !community_images_url.length
    ) {
      return res
        .status(400)
        .json({ message: "All fields are required!", success: false });
    }
    const community = new ThrivingCommunity({
      hacker_participants,
      developers,
      community_images_url,
    });
    await community.save();
    return res.status(201).json({
      message: "Community fields added successfully!",
      success: true,
      data: community,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Internal server error!" });
  }
};

// get
export const getCommunityController = async (req, res) => {
  try {
    const community = await ThrivingCommunity.find({});
    return res.status(200).json(community);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error!" });
  }
};
// update:
export const updateCommunityController = async (req, res) => {
  try {
    const id = req.params.id;
    const { hacker_participants, developers } = req.body;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Valid ID is required",
        success: false,
      });
    }

    const community = await ThrivingCommunity.findById(id);
    if (!community) {
      return res
        .status(404)
        .json({ message: "Community not exist", success: false });
    }

    if (hacker_participants !== undefined) {
      community.hacker_participants = hacker_participants;
    }
    if (developers !== undefined) {
      community.developers = developers;
    }

    if (req.files?.length) {
      const community_images_url = await uploadImagesToCloudinary(req.files);
      community.community_images_url.push(...community_images_url);
    }

    await community.save();
    return res.status(200).json({
      message: "Updated Successfully",
      success: true,
      data: community,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error!" });
  }
};

// delete:
export const deleteCommunityController = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Valid ID is required",
        success: false,
      });
    }
    const community = await ThrivingCommunity.findByIdAndDelete(id);
    if (!community) {
      return res
        .status(404)
        .json({ message: "Community not exist", success: false });
    }
    return res.status(200).json({
      message: "Deleted successfully!",
      success: true,
      data: community,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error!" });
  }
};

// Get Latest community:
export const getLatestCommunity = async (req, res) => {
  try {
    const latest = await ThrivingCommunity.findOne().sort({ createdAt: -1 });
    if (!latest) {
      return res.status(404).json({ message: "No community found" });
    }
    return res.status(200).json(latest);
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
