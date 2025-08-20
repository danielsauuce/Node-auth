import image from "../models/image.mjs";
import uploadToCloudinary from "../helpers/cloudinaryHelpers.mjs";

const uploadImage = async (req, res) => {
  try {
    //check if file is missing
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "File is required. Please upload an image",
      });
    }

    //upload to cloudinary
    const { url, publicId } = await uploadToCloudinary(req.file.path);

    //storing the url and publicId into database
    const newUploadedImage = new image({
      url,
      publicId,
      uploadedBy: req.userInfo.userId,
    });
    await newUploadedImage.save();

    res.status(201).json({
      success: true,
      message: "Image uploaded",
      image: newUploadedImage,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong! Please try again",
    });
  }
};

export default uploadImage;
