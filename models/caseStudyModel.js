import mongoose from "mongoose";

const caseStudySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  slug: {
    type: String,
    required: true,
    unique: true
  },
  short_description: {
    type: String,
    required: true
  },
  background_image_url: {
    type: String,
    required: true
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  link: {
    type: String,
  },
}, {
  timestamps: true
});

const CaseStudy = mongoose.model("CaseStudy", caseStudySchema);
export default CaseStudy;
