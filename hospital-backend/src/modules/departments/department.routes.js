import express from "express";
import { createDepartmentValidation } from "./department.validation.js";
import { authenticate } from "../../shared/middleware/auth.middleware.js"
import { authorize } from "../../shared/middleware/authorize.middleware.js"
import  validate  from "../../shared/middleware/validate.middleware.js"
import * as Controller from "../departments/department.controller.js"

const router = express.Router();

router.post("/", authenticate, authorize("department.create"), createDepartmentValidation, validate, Controller.create);
router.get("/", authenticate, authorize("department.read"), Controller.findAll);
router.put("/:id", authenticate, authorize("department.update"), Controller.update);
router.delete("/:id", authenticate, authorize("department.delete"), Controller.remove);

export default router;