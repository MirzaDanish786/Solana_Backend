import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST, // e.g., smtp.gmail.com or smtp.ethereal.email
  port: process.env.MAIL_PORT, // e.g., 587
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.MAIL_USER, // your email address
    pass: process.env.MAIL_PASS, // your email password or app password
  },
});

export default transporter;
