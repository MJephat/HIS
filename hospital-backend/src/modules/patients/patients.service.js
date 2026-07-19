import * as Repository from "../patients/patients.repository.js";
import numberGeneratorService from "../../shared/services/numberGenerator.service.js";
import ApiError from "../../shared/errors/ApiError.js";
import { pagination } from "../../shared/utils/pagination.js";

class PatientService {

    async create(data) {
        const exists = await Repository.patientExists(data.nationalId);

        if (exists) {
            throw new ApiError(409, "Patient already exists.");
        }

        const patientNumber = await numberGeneratorService.generate("PATIENT");
 
         const patient = await Repository.createPatient({

        ...data,

        patientNumber,

        dateOfBirth: new Date(data.dateOfBirth),

    });
            return patient;

    }

     async findAll(query) {

        const { page, limit, skip } = pagination(query);
        const search = query.search || "";
        const { patients, total } = await Repository.getPatients({ skip, limit, search, });

        return {  patients, total, page, limit,};
    }


    async findById(id) {
        const patient = await Repository.getPatientById(id);
        if (!patient) {
            throw new ApiError(404, "Patient not found.");
        }

        return patient;
    }


   async update(id, data) {

    const patient = await Repository.getPatientById(id);
    if (!patient) {
        throw new Error("Patient not found");
    }

    if (data.dateOfBirth) {
        data.dateOfBirth = new Date(data.dateOfBirth);
    }

    return Repository.updatePatient(id, data);

}


    async delete(id) {
        const patient = await Repository.getPatientById(id);
        if (!patient) {
            throw new ApiError(404, "Patient not found.");
        }
        return await Repository.softDeletePatient(id);
    }

}

export default new PatientService();