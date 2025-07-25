/**
 * @fileoverview Solana Project Backend APIs
 * @author
 *   Mirza Muhammad Danish Baig – MERN Stack Intern
 * @note
 *   Designed with clean architecture, so it's easy to plug into dynamic frontend.
 */

import express from "express";
import { connectDB } from "./config/connectdb.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

// Routes imports:
import statsRoute from "./routes/statsRoute.js";
import sliderRoute from "./routes/sliderRoute.js";
import communityRoute from "./routes/communityRoute.js";
import companyListRoute from "./routes/companiesListRoute.js";
import caseStudyRoute from "./routes/caseStudyRoute.js";
import authRoute from "./routes/authRoute.js";
import buildGrowthRoute from "./routes/buildGrowthRoute.js";

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static("uploads"));
const port = 3000;
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use("/api/stats", statsRoute);
app.use("/api/slider", sliderRoute);
app.use("/api/community", communityRoute);
app.use("/api/company-list", companyListRoute);
app.use("/api/case-study", caseStudyRoute);
app.use("/api/auth", authRoute);
app.use("/api/build-growth", buildGrowthRoute);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
