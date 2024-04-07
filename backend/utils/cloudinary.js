import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: 'dj1mhaagb',
  api_key: '187144662957924',
  api_secret: 'TKPzIq0ZoV63TlvlBGYHDyt-maM',
});

const uploadOnCloundinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    return response;
  } catch (error) {
    return null;
  }
};

export { uploadOnCloundinary };
