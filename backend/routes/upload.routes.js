import express from "express";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import path from "path";

cloudinary.config({
  cloud_name: "dj1mhaagb",
  api_key: "187144662957924",
  api_secret: "TKPzIq0ZoV63TlvlBGYHDyt-maM",
});

const uploadOnCloundinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    fs.unlink(localFilePath, (data) => {
      console.log(data);
    });
    return response;
  } catch (error) {
    fs.unlink(localFilePath, (data) => {
      console.log(data);
    });
    return null;
  }
};

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "/tmp");
  },

  filename: (req, file, cb) => {
    const extname = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${Date.now()}${extname}`);
  },
});

const upload = multer({ storage });

router.post("/", upload.single("image"), async (req, res) => {
  if (!req.file) {
    res.status(400).send({ message: "No image file provided" });
  } else {
    const image = await uploadOnCloundinary(`/tmp/${req.file.filename}`);
    res.status(200).send({
      message: "Image uploaded successfully",
      image: image.url,
    });
  }
});

// router.post("/", (req, res) => {
//   uploadSingleImage(req, res, (err) => {
//     if (err) {
//       res.status(400).send({ message: err.message });
//     } else if (req.file) {
//       console.log(req.file)
//       res.status(200).send({
//         message: "Image uploaded successfully",
//         image: `/tmp/${req.file.filename}`,
//       });
//     } else {
//       res.status(400).send({ message: "No image file provided" });
//     }
//   });
// });

export default router;
