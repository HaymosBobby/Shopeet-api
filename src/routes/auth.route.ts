import express from "express";
import { registerUser, sendOtp } from "../controllers/auth.controlller";
import validateResource from "../middlewares/zod.middleware";
import { otpSchema } from "../schema/auth.schema";

const router = express.Router();

router.post("/send-otp", validateResource(otpSchema), sendOtp);

router.post("/register", registerUser);

export default router;
