import express from "express";
import { register } from "./auth.controller.js";
import { registerValidation } from "./auth.validator.js";

const router = express.Router();

router.post("/register", registerValidation, register);

export default router;