import express from "express";

import * as DoctorController from "./doctor.controller.js";

import {createDoctorSchema, updateDoctorSchema, updateDoctorStatusSchema, getDoctorsSchema} from "./doctor.validation.js";

import { authorize } from "../../shared/middleware/authorize.middleware.js";
import   validate   from "../../shared/middleware/validate.middleware.js";
import { authenticate } from "../../shared/middleware/auth.middleware.js";

const router = express.Router();

router.get( "/specializations", authenticate, authorize("doctor.read"), DoctorController.getSpecializations);
router.post( "/", authenticate, authorize("doctor.create"), validate(createDoctorSchema), DoctorController.create);
router.get( "/", authenticate, authorize("doctor.read"), validate(getDoctorsSchema), DoctorController.getAll);
router.get( "/:id", authenticate, authorize("doctor.read"), DoctorController.getById);
router.put( "/:id", authenticate, authorize("doctor.update"),validate(updateDoctorSchema),DoctorController.update);
router.patch( "/:id/status", authenticate, authorize("doctor.update"), validate(updateDoctorStatusSchema), DoctorController.updateStatus);
router.delete( "/:id", authenticate, authorize("doctor.delete"), DoctorController.remove);

export default router;