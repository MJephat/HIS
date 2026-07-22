import bcrypt from "bcrypt";

import * as DoctorRepository from "./doctor.repository.js";
// import * as AuthRepository from "../../shared/middleware/auth.middleware.js";
import * as AuthRepository from "../auth/auth.repository.js";
// import * as AuditRepository from "../audit/audit.repository.js"; 

/**
 * Generate Employee Number
 * Example: DOC000001
 */
const generateEmployeeNumber = async () => {
    const doctors = await DoctorRepository.getDoctors({
        skip: 0,
        limit: 1,
    });

    const total = doctors.total + 1;

    return `DOC${String(total).padStart(6, "0")}`;

};


//   Register Doctor
export const create = async (payload, currentUser) => {

    // Check email
    const emailExists = await AuthRepository.findUserByEmail(payload.email);

    if (emailExists) {
        throw new Error("Email already exists.");
    }

    // Check license number
    const licenseExists =
        await DoctorRepository.findDoctorByLicense(
            payload.licenseNumber
        );

    if (licenseExists) {
        throw new Error("License number already exists.");
    }

    // Check specialization
    const specialization =
        await DoctorRepository.findSpecializationById(
            payload.specializationId
        );

    if (!specialization) {
        throw new Error("Specialization not found.");
    }

    // Find DOCTOR role
    const role =
        await AuthRepository.findRoleByName("DOCTOR");

    if (!role) {
        throw new Error("DOCTOR role not found.");
    }

    const employeeNumber =
        await generateEmployeeNumber();

    const password = await bcrypt.hash(
        payload.password,
        10
    );

    return DoctorRepository.transaction(async (tx) => {

        //   Create User
        const user = await tx.user.create({

            data: {

                employeeNumber,

                firstName: payload.firstName,

                middleName: payload.middleName,

                lastName: payload.lastName,

                email: payload.email,

                phone: payload.phone,

                password,

                departmentId: payload.departmentId,

            },

        });

        //  Assign Role
        await tx.userRole.create({

            data: {

                userId: user.id,
                roleId: role.id,

            },

        });

        // Create Doctor
        const doctor = await tx.doctor.create({

            data: {

                userId: user.id,

                employeeNumber,

                licenseNumber: payload.licenseNumber,

                specializationId: payload.specializationId,

                consultationFee: payload.consultationFee,

                employmentType: payload.employmentType,

                yearsOfExperience:
                    payload.yearsOfExperience,

                biography: payload.biography,

                consultationRoom:
                    payload.consultationRoom,

            },

            include: {

                specialization: true,

                user: {
                    include: {
                        department: true,
                    },
                },

            },

        });

        //  Audit Log
        // if (AuditRepository?.createAuditLog) {

        //     await AuditRepository.createAuditLog({
        //         action: "CREATE",
        //         entity: "Doctor",
        //         entityId: doctor.id,
        //         newData: doctor,
        //         userId: currentUser.id,

        //     });

        // }

        return doctor;

    });

};


//  Get Doctor
export const getById = async (id) => {
    const doctor = await DoctorRepository.findDoctorById(id);

    if (!doctor) {
        throw new Error("Doctor not found.");
    }

    return doctor;

};


//   Get Doctors
export const getAll = async (query) => {
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;
    const skip = (page - 1) * limit;

    return DoctorRepository.getDoctors({

        skip,
        limit,
        search: query.search || "",
        status: query.status,
        specializationId:
            query.specializationId,

    });

};


//   Update Doctor
export const update = async (id, payload) => {
    const doctor = await DoctorRepository.findDoctorById(id);

    if (!doctor) {
        throw new Error("Doctor not found.");
    }

    return DoctorRepository.updateDoctor(id, payload);

};


//   Change Status
export const updateStatus = async ( id, status) => {
    return DoctorRepository.updateDoctorStatus(
        id,
        status
    );

};


//   Delete Doctor
export const remove = async (id) => {

    const doctor = await DoctorRepository.findDoctorById(id);

    if (!doctor) {
        throw new Error("Doctor not found.");
    }

    return DoctorRepository.deleteDoctor(id);

};



//  Get Specializations
export const getSpecializations = async () => {

    return DoctorRepository.getSpecializations();

};