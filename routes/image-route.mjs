import express from "express";
import authMiddleware from "../middleware/auth-middleware.mjs";
import isAdminUserMiddleware from "../middleware/admin-middleware.mjs";
import uploadMiddleware from "../middleware/upload-middleware.mjs";
import {
  uploadImageController,
  fetchImagesController,
  deleteImagesController,
} from "../controllers/image-controller.mjs";

const router = express.Router();

//upload image
router.post(
  "/upload",
  authMiddleware,
  isAdminUserMiddleware,
  uploadMiddleware.single("image"),
  uploadImageController
);

//get all images
router.get("/get", authMiddleware, fetchImagesController);

router.delete(
  "/delete/:id",
  authMiddleware,
  isAdminUserMiddleware,
  deleteImagesController
);

export default router;
