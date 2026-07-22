import express from "express";
import * as PatientController from "../patients/patients.controller.js";
import { authorize } from "../../shared/middleware/authorize.middleware.js";
import { authenticate } from "../../shared/middleware/auth.middleware.js";
import validate from "../../shared/middleware/validate.middleware.js";
import { createPatientValidation, updatePatientValidation } from "./patients.validator.js";


const router = express.Router();

router.post( "/", authenticate, authorize("patient.create"), createPatientValidation, validate, PatientController.create);
router.get( "/", authenticate, authorize("patient.read"), PatientController.findAll);
router.get( "/:id", authenticate, authorize("patient.read"), PatientController.findById);
router.put( "/:id", authenticate, authorize("patient.update"), updatePatientValidation, validate, PatientController.update);
router.delete( "/:id", authenticate, authorize("patient.delete"), PatientController.remove);
router.patch( "/:id/restore", authenticate, authorize("patient.update"), PatientController.restore);

export default router