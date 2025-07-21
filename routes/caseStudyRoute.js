import express from "express";
import {
  addCaseStudyController,
  deleteCaseStudyController,
  getAllCaseStudiesController,
  getCaseStudyBySlugController,
  updateCaseStudyController,
} from "../controllers/caseStudyController.js";
import upload from "../middlewares/uploads.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";
const router = express.Router();

router.post("/",isAuthenticated, upload.single("bg_image"), addCaseStudyController);
router.get("/:slug", getCaseStudyBySlugController);
router.get("/", getAllCaseStudiesController);
router.put("/:slug",isAuthenticated, upload.single("bg_image"), updateCaseStudyController);
router.delete("/:slug",isAuthenticated, upload.single("bg_image"), deleteCaseStudyController);
export default router;
