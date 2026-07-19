import { body } from "express-validator";

export const createPatientValidation = [

    body("firstName")
        .trim()
        .notEmpty()
        .withMessage("First name is required")
        .isLength({ min: 2, max: 100 }),

    body("middleName")
        .optional()
        .trim(),

    body("lastName")
        .trim()
        .notEmpty()
        .withMessage("Last name is required")
        .isLength({ min: 2, max: 100 }),

    body("gender")
        .notEmpty()
        .isIn(["MALE", "FEMALE", "OTHER"])
        .withMessage("Invalid gender"),

    body("dateOfBirth")
        .notEmpty()
        .isISO8601()
        .withMessage("Invalid date of birth"),

    body("phone")
        .trim()
        .notEmpty()
        .withMessage("Phone number is required")
        .matches(/^(?:\+254|254|0)?7\d{8}$/)
        .withMessage("Invalid Kenyan phone number"),

    body("email")
        .optional()
        .isEmail()
        .withMessage("Invalid email address"),

    body("nationalId")
        .optional()
        .trim(),

    body("passportNumber")
        .optional()
        .trim(),

    body("bloodGroup")
        .optional()
        .isIn([
            "A_POSITIVE",
            "A_NEGATIVE",
            "B_POSITIVE",
            "B_NEGATIVE",
            "AB_POSITIVE",
            "AB_NEGATIVE",
            "O_POSITIVE",
            "O_NEGATIVE"
        ]),

    body("maritalStatus")
        .optional()
        .isIn([
            "SINGLE",
            "MARRIED",
            "DIVORCED",
            "WIDOWED"
        ]),

    body("address")
        .optional()
        .trim(),

    body("occupation")
        .optional()
        .trim(),

    body("nextOfKinName")
        .trim()
        .notEmpty()
        .withMessage("Next of kin name is required"),

    body("nextOfKinPhone")
        .trim()
        .notEmpty()
        .withMessage("Next of kin phone is required")
        .matches(/^(?:\+254|254|0)?7\d{8}$/)
        .withMessage("Invalid next of kin phone"),

    body("nextOfKinRelationship")
        .trim()
        .notEmpty()
        .withMessage("Relationship is required"),

    body("insuranceProvider")
        .optional()
        .trim(),

    body("insuranceNumber")
        .optional()
        .trim()

];

//validation for updates

export const updatePatientValidation = [

    body("firstName").optional().trim(),

    body("middleName").optional().trim(),

    body("lastName").optional().trim(),

    body("gender")
        .optional()
        .isIn(["MALE", "FEMALE", "OTHER"]),

    body("phone")
        .optional()
        .matches(/^(?:\+254|254|0)?7\d{8}$/),

    body("email")
        .optional()
        .isEmail(),

    body("bloodGroup")
        .optional()
        .isIn([
            "A_POSITIVE",
            "A_NEGATIVE",
            "B_POSITIVE",
            "B_NEGATIVE",
            "AB_POSITIVE",
            "AB_NEGATIVE",
            "O_POSITIVE",
            "O_NEGATIVE"
        ]),

    body("maritalStatus")
        .optional()
        .isIn([
            "SINGLE",
            "MARRIED",
            "DIVORCED",
            "WIDOWED"
        ])

];