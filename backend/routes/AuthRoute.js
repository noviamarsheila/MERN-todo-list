import express from "express";
import {
	register,
	getMe,
	login,
	logout,
} from "../controllers/AuthController.js";

const router = express.Router();

router.post("/", register);
router.post("/login", login);
router.get("/me", getMe);
router.delete("/logout", logout);

export default router;
