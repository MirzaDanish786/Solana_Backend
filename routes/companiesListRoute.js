import express from "express";
import {
  addCompanyController,
  deleteCompanyController,
  getCompanyController,
  updateCompanyController,
} from "../controllers/companiesListController.js";
import upload from "../middlewares/uploads.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";
const router = express.Router();

router.post("/", isAuthenticated, upload.single("image"), addCompanyController);
router.get("/", getCompanyController);
router.put(
  "/:id",
  isAuthenticated,
  upload.single("image"),
  updateCompanyController
);
router.delete("/:id", isAuthenticated, deleteCompanyController);
export default router;
