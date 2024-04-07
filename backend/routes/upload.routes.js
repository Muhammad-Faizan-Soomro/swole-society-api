import express from "express";
import multer from "multer";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "/tmp");
  },

  filename: (req, file, cb) => {
    cb(null, `image-${Date.now()}`);
  },
});

const upload = multer({ storage });
const uploadSingleImage = upload.single("image");

router.post("/", (req, res) => {
  uploadSingleImage(req, res, (err) => {
    if (err) {
      res.status(400).send({ message: err.message });
    } else if (req.file) {
      console.log(req.file);
      res.status(200).send({
        message: "Image uploaded successfully",
        image: `/tmp/${req.file.filename}`,
      });
    } else {
      res.status(400).send({ message: "No image file provided" });
    }
  });
});

export default router;
