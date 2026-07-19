import asyncHandler from "../../shared/middleware/asyncHandler.js";
import ApiResponse from "../../shared/response/response.js";
import PatientService from "../patients/patients.service.js";

export const create = asyncHandler(async (req, res) => {
    const patient = await PatientService.create(req.body);
    return ApiResponse.success(
        res,
        patient,
        "Patient registered successfully.",
        201
    );

});

export const findAll = asyncHandler(async (req, res) => {
    const result = await PatientService.findAll(req.query);
    return ApiResponse.paginated(
        res,
        result.patients,
        result.page,
        result.limit,
        result.total,
        "Patients retrieved successfully."
    );
});

export const findById = asyncHandler(async (req, res) => {
    const patient = await PatientService.findById(req.params.id);

    return ApiResponse.success(
        res,
        patient,
        "Patient retrieved successfully."
    );

});

export const update = asyncHandler(async (req, res) => {
    const patient = await PatientService.update(
        req.params.id,
        req.body
    );

    return ApiResponse.success(
        res,
        patient,
        "Patient updated successfully."
    );
});

export const remove = asyncHandler(async (req, res) => {
    await PatientService.delete(req.params.id);
    return ApiResponse.success(
        res,
        null,
        "Patient deleted successfully."
    );

});

export const restore = asyncHandler(async (req, res) => {
    const patient = await PatientService.restore(req.params.id);
    return ApiResponse.success(
        res,
        patient,
        "Patient restored successfully."
    );

});