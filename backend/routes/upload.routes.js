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
      // console.log(data);
    });
    return response;
  } catch (error) {
    fs.unlink(localFilePath, (data) => {
      // console.log(data);
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

const upload = multer({
  storage,
});

router.post("/", upload.array("image"), async (req, res) => {
  if (!req.files) {
    res.status(400).send({ message: "No image file provided" });
  } else {
    let images = [];
    for (let i = 0; i < req.files.length; i++) {
      const image = await uploadOnCloundinary(`/tmp/${req.files[i].filename}`);
      images.push(image.url);
    }
    res.status(200).send({
      message: "Image uploaded successfully",
      image: images,
    });
  }
});

export default router;
