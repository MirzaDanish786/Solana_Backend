import mongoose from "mongoose";

const thrivingCommunitySchema = new mongoose.Schema(
  {
    hacker_participants: {
      type: Number,
      required: true,
      default: 0,
    },
    developers: {
      type: Number,
      required: true,
      default: 0,
    },
    community_images_url: {
      type: [String],
      required: true,         
    }
  },
  {
    timestamps: true  
  }
);

const ThrivingCommunity = mongoose.model(
  "ThrivingCommunity",
  thrivingCommunitySchema
);

export default ThrivingCommunity;
