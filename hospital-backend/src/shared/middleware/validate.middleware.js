import ApiResponse from "../response/response.js";

const validate = (schema, location = "body") => {
    return (req, res, next) => {
        try {
            if (!schema || typeof schema.validate !== "function") {
                return next();
            }

            const data = req[location] ?? {};

            const { error, value } = schema.validate(data, {
                abortEarly: false,
                allowUnknown: true,
                stripUnknown: true,
            });

            if (error) {
                const details = error.details.map(d => ({ message: d.message, path: d.path }));
                return ApiResponse.error(res, "Validation failed", 422, details);
            }

            req[location] = value;
            return next();
        } catch (err) {
            return ApiResponse.error(res, err.message || "Validation error", 500);
        }
    };
};

export default validate;