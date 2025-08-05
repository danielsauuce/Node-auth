import express from "express";
import authControllers from "../controllers/auth-controllers.mjs";

const router = express.Router();

router.post("/register", authControllers.registerUser);

router.post("/login", authControllers.loginUser);

export default router;
