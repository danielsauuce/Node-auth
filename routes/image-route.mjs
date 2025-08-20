import express from "express";
import authMiddleware from "../middleware/auth-middleware.mjs";
import isAdminUserMiddleware from "../middleware/admin-middleware.mjs";
import uploadMiddleware from "../middleware/upload-middleware.mjs"


const router = express.Router();

//upload image
router.post("/upload",authMiddleware,isAdminUserMiddleware, uploadMiddleware);

//get all images

export default router;
