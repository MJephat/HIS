import { body } from "express-validator";

export const createDepartmentValidation = [
    body("name").notEmpty().withMessage("Department name is required"),
];