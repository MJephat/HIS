import { body } from "express-validator";

export const registerValidation = [

    body("firstName").notEmpty(),
    body("lastName").notEmpty(),
    body("email").isEmail(),
    body("phone").notEmpty(),
    body("password")
        .isLength({
            min: 6,
        }),

];