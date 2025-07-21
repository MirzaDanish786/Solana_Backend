import multer from "multer";
import path from "path";
import fs from "fs";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let folder = "uploads/others";

    if (req.baseUrl.includes("/token-exe")) {
      folder = "uploads/token";
    } else if (req.baseUrl.includes("/community")) {
      folder = "uploads/community";
    }

    fs.mkdirSync(folder, { recursive: true });

    cb(null, folder);
  },

  filename: function (req, file, cb) {
    const uniqueName = `${Date.now()}-${file.originalname.replace(
      /\s+/g,
      "_"
    )}`;
    cb(null, uniqueName);
  },
});

const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();
  const allowedTypes = [".jpg", ".jpeg", ".png" , '.webp'];

  if (allowedTypes.includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error("Only .jpg, .jpeg, .png images are allowed"), false);
  }
};

const upload = multer({ storage, fileFilter });

export default upload;
