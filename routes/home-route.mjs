import express from "express";
import homeController from "../controllers/home-controller.mjs";
import authMiddleware from "../middleware/auth-middleware.mjs";

const router = express.Router();

router.get("/welcome", authMiddleware, homeController);


export default router;
