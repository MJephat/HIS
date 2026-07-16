import { validationResult } from "express-validator";
import ApiResponse from "../response/response.js";


const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return ApiResponse.error(
            res,
            "Validation failed",
            422,
            errors.array()
        );
    }

    next();

};

export default validate;