import express from "express";
import { login, me, register } from "./auth.controller.js";
import { loginValidation, registerValidation } from "./auth.validator.js";
import validate from "../../shared/middleware/validate.middleware.js";
import { authenticate } from "../../shared/middleware/auth.middleware.js";

const router = express.Router();

router.post("/register", registerValidation, register);
router.post("/login", loginValidation,validate, login);
router.get("/me", authenticate, me);

export default router;