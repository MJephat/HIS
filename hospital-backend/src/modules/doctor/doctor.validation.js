import Joi from "joi";

export const createDoctorSchema = Joi.object({

    firstName: Joi.string()
        .trim()
        .min(2)
        .max(100)
        .required(),

    middleName: Joi.string()
        .trim()
        .allow("", null),

    lastName: Joi.string()
        .trim()
        .min(2)
        .max(100)
        .required(),

    email: Joi.string()
        .email()
        .required(),

    phone: Joi.string()
        .min(10)
        .max(15)
        .required(),

    password: Joi.string()
        .min(6)
        .required(),

    departmentId: Joi.string()
        .uuid()
        .required(),

    specializationId: Joi.string()
        .uuid()
        .required(),

    licenseNumber: Joi.string()
        .trim()
        .required(),

    consultationFee: Joi.number()
        .positive()
        .required(),

    employmentType: Joi.string()
        .valid(
            "FULL_TIME",
            "PART_TIME",
            "CONTRACT",
            "VISITING"
        )
        .required(),

    yearsOfExperience: Joi.number()
        .integer()
        .min(0)
        .allow(null),

    biography: Joi.string()
        .allow("", null),

    consultationRoom: Joi.string()
        .allow("", null),

});


// update validation 
export const updateDoctorSchema = Joi.object({

    firstName: Joi.string()
        .trim()
        .min(2)
        .max(100),

    middleName: Joi.string()
        .trim()
        .allow("", null),

    lastName: Joi.string()
        .trim()
        .min(2)
        .max(100),

    phone: Joi.string()
        .min(10)
        .max(15),

    departmentId: Joi.string()
        .uuid(),

    specializationId: Joi.string()
        .uuid(),

    consultationFee: Joi.number()
        .positive(),

    employmentType: Joi.string().valid(
        "FULL_TIME",
        "PART_TIME",
        "CONTRACT",
        "VISITING"
    ),

    yearsOfExperience: Joi.number()
        .integer()
        .min(0),

    biography: Joi.string()
        .allow("", null),

    consultationRoom: Joi.string()
        .allow("", null),

}).min(1);

// change status validation
export const updateDoctorStatusSchema = Joi.object({

    status: Joi.string()
        .valid(
            "ACTIVE",
            "ON_LEAVE",
            "SUSPENDED",
            "RETIRED"
        )
        .required(),

});

// search validation
export const getDoctorsSchema = Joi.object({

    page: Joi.number()
        .integer()
        .min(1)
        .default(1),

    limit: Joi.number()
        .integer()
        .min(1)
        .max(100)
        .default(10),

    search: Joi.string()
        .allow("", null),

    status: Joi.string()
        .valid(
            "ACTIVE",
            "ON_LEAVE",
            "SUSPENDED",
            "RETIRED"
        )
        .allow("", null),

    specializationId: Joi.string()
        .uuid()
        .allow("", null),

});