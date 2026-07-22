import express from "express";
import { login, me, register } from "./auth.controller.js";
import { loginValidation, registerValidation } from "./auth.validator.js";
import validate from "../../shared/middleware/validate.middleware.js";
import { authenticate } from "../../shared/middleware/auth.middleware.js";
import { authorize } from "../../shared/middleware/authorize.middleware.js";
import asyncHandler from "../../shared/middleware/asyncHandler.js";

const router = express.Router();

router.post("/register", registerValidation, register);
// router.post("/login", loginValidation,validate, login);
router.post("/login", validate(loginValidation), asyncHandler(login));
router.get("/me", authenticate, me);


export default router;