import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: "dj1mhaagb",
  api_key: "187144662957924",
  api_secret: "TKPzIq0ZoV63TlvlBGYHDyt-maM",
  secure: true,
});

const uploadOnCloundinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    // fs.unlink(localFilePath, (data) => {
    //   console.log(data);
    // });
    return response;
  } catch (error) {
    // fs.unlink(localFilePath, (data) => {
    //   console.log(data);
    // });
    return null;
  }
};

export { uploadOnCloundinary };
