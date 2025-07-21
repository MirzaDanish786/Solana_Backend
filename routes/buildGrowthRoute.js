import express from "express";
import {
  addBuildGrowthController,
  deleteBuildGrowthController,
  getBuildGrowthController,
  getSingleBuildGrowthController,
  updateBuildGrowthController,
} from "../controllers/buildGrowthController.js";
import upload from "../middlewares/uploads.js";
import {isAuthenticated} from "../middlewares/isAuthenticated.js";
const router = express.Router();

router.post(
  "/",
  isAuthenticated,
  upload.fields([
    { name: "logo", maxCount: 1 },
    { name: "bg_image", maxCount: 1 },
  ]),
  addBuildGrowthController
);

router.get("/", getBuildGrowthController);
router.get("/:slug", getSingleBuildGrowthController);
router.put(
  "/:slug",
  isAuthenticated,
  upload.fields([
    { name: "logo", maxCount: 1 },
    { name: "bg_image", maxCount: 1 },
  ]),
  updateBuildGrowthController
);
router.delete("/:slug", isAuthenticated, deleteBuildGrowthController);

export default router;
