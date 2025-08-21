import express from "express";
import authControllers from "../controllers/auth-controllers.mjs";
import authMiddleware from "../middleware/auth-middleware.mjs";

const router = express.Router();

router.post("/register", authControllers.registerUser);

router.post("/login", authControllers.loginUser);

router.post("/change-password", authMiddleware, authControllers.changePassword);

export default router;
