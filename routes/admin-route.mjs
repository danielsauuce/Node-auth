import express from "express";
import adminController from "../controllers/admin-controller.mjs";
import authMiddleware from "../middleware/auth-middleware.mjs";
import isAdminUser from "../middleware/admin-middleware.mjs";
const router = express.Router();

router.get("/admin", authMiddleware, isAdminUser, adminController);

export default router;
