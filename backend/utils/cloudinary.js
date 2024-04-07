import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: "dj1mhaagb",
  api_key: "187144662957924",
  api_secret: "TKPzIq0ZoV63TlvlBGYHDyt-maM",
  secure: true,
});

const uploadOnCloundinary = async (localFilePath) => {
  try {
    // if (!localFilePath) return null;
    const response = await cloudinary.uploader.upload(
      localFilePath,
      function (result, error) {
        if (result) {
          res.status(200).json(result)
          return response;
        } else {
          res.status(500).json(error)
          return null;
        }
      }
    );

    // fs.unlink(localFilePath, (data) => {
    //   console.log(data);
    // });
  } catch (error) {
    // fs.unlink(localFilePath, (data) => {
    //   console.log(data);
    // });
  }
};

export { uploadOnCloundinary };
