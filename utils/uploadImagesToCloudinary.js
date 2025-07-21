import cloudinary from "../config/cloudinary.js";
import fs from "fs";
const uploadImagesToCloudinary = async (files) => {
  const fileArray = Array.isArray(files) ? files : [files];
  const urls = [];
  for (const file of fileArray) {
    const result = await cloudinary.uploader.upload(file.path);
    urls.push(result.secure_url);
    fs.unlinkSync(file.path); 
  }
  return urls;
};
export default uploadImagesToCloudinary;
