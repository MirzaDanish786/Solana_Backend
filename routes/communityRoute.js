import express from "express";
import {
  addCommunityController,
  deleteCommunityController,
  getCommunityController,
  getLatestCommunity,
  updateCommunityController,
} from "../controllers/thrivingCommunityController.js";
import upload from "../middlewares/uploads.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";
const router = express.Router();

router.post("/",isAuthenticated, upload.array("images", 10), addCommunityController);
router.get("/", getCommunityController);
router.put("/:id",isAuthenticated, upload.array("images", 10), updateCommunityController);
router.delete("/:id",isAuthenticated, deleteCommunityController);
router.get('/latest', getLatestCommunity)
export default router
