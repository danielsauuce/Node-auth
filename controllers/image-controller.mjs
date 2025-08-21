import Image from "../models/image.mjs";
import uploadToCloudinary from "../helpers/cloudinaryHelpers.mjs";
import cloudinary from "../config/cloudinary.mjs";

const uploadImageController = async (req, res) => {
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

const fetchImagesController = async (req, res) => {
  try {
    const images = await Image.find({});

    if (images) {
      res.status(200).json({
        success: true,
        data: images,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong! Please try again",
    });
  }
};

const deleteImagesController = async (req, res) => {
  try {
    const getCurrentImageIdToBeDeleted = req.params.id;
    const userId = req.userInfo.userId;

    const image = await Image.findByIdAndDelete(getCurrentImageIdToBeDeleted);
    if (!image) {
      return res.status(404).json({
        success: false,
        message: "Image not found",
      });
    }

    //check if image is uploaded by the current user trying to delete image
    if (image.uploadedBy.toString !== userId) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to delete this image",
      });
    }

    // deleting image first from cloudinary storage
    await cloudinary.uploader.destroy(image.publicId);

    //delete from DB
    await Image.findByIdAndDelete(getCurrentImageIdToBeDeleted);

    res.status(200).json({
      success: true,
      message: "Image deleted successfully.",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong! Please try again",
    });
  }
};

export { uploadImageController, fetchImagesController, deleteImagesController };
