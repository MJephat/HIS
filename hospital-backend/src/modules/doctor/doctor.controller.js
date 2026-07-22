import * as DoctorService from "./doctor.service.js";

//  Create Doctor
export const create = async (req, res) => {
    const doctor = await DoctorService.create(
        req.body,
        req.user
    );

    return res.status(201).json({
        success: true,
        message: "Doctor created successfully.",
        data: doctor,
    });

};

//  Get All Doctors
export const getAll = async (req, res) => {
    const result = await DoctorService.getAll(req.query);

    return res.status(200).json({
        success: true,
        message: "Doctors retrieved successfully.",
        data: result.doctors,
        pagination: {
            total: result.total,
            page: Number(req.query.page) || 1,
            limit: Number(req.query.limit) || 10,
            totalPages: Math.ceil(
                result.total /
                (Number(req.query.limit) || 10)
            ),
        },
    });

};

// Get Doctor By ID
export const getById = async (req, res) => {
    const doctor = await DoctorService.getById(
        req.params.id
    );

    return res.status(200).json({
        success: true,
        data: doctor,
    });

};

// Update Doctor
export const update = async (req, res) => {
    const doctor = await DoctorService.update( req.params.id, req.body );

    return res.status(200).json({
        success: true,
        message: "Doctor updated successfully.",
        data: doctor,
    });

};


//  Change Doctor Status
export const updateStatus = async (req, res) => {
    const doctor = await DoctorService.updateStatus(
        req.params.id,
        req.body.status
    );

    return res.status(200).json({
        success: true,
        message: "Doctor status updated successfully.",
        data: doctor,
    });

};

//   Delete Doctor
export const remove = async (req, res) => {
    await DoctorService.remove(req.params.id);

    return res.status(200).json({
        success: true,
        message: "Doctor deleted successfully.",
    });

};


//  Get Specializations
export const getSpecializations = async (req, res) => {
    const specializations = await DoctorService.getSpecializations();

    return res.status(200).json({
        success: true,
        data: specializations,
    });

};