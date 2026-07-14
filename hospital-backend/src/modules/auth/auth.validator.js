import { body } from "express-validator";

export const registerValidation = [
    body("employeeNumber").notEmpty().withMessage("Employee number is required"),
    body("firstName").notEmpty().withMessage("First name is required"),
    body("lastName").notEmpty().withMessage("Last name is required"),
    body("email").isEmail().withMessage("Invalid email address"),
    body("phone").notEmpty().withMessage("Phone number is required"),
    body("password")
        .isLength({
            min: 6,
        })
        .withMessage("Password must be at least 6 characters long"),

];

export const loginValidation = [
    body("email").isEmail().withMessage("Invalid email address"),
    body("password").notEmpty().withMessage("Password is required"),
];