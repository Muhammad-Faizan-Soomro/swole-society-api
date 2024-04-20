import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: "dq69j0hgr",
  api_key: "581319314362491",
  api_secret: "cx-ECx1MZKh4j9gv4ED5A-BU6ao",
  secure: true,
});

const uploadOnCloundinary = async (localFilePath) => {
  try {
    // if (!localFilePath) return null;
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
