import * as DepartmentRepository from "../departments/department.repository.js"

class DepartmentService {

    async create(data) {

        console.log(" department service 1: Creating department:", data);
        const exists = await DepartmentRepository.departmentExists(data.name);

        console.log("department service 2 :Exists:", exists);

        if (exists)
            throw new Error(
                "Department already exists."
            );
        return DepartmentRepository.createDepartment(
            data
        );

    }

    async findAll(query) {

        const page = Number(query.page) || 1;
        const limit = Number(query.limit) || 10;
        const search = query.search || "";

        return DepartmentRepository.getDepartments({ page, limit, search,});

    }

    async findOne(id) {
        const department = await DepartmentRepository.getDepartmentById(id);
        if (!department)
            throw new Error(
                "Department not found."
            );

        return department;

    }

    async update(id, data) {
        return DepartmentRepository.updateDepartment( id, data );
    }

    async remove(id) {
        return DepartmentRepository.deleteDepartment( id );
    }

}

export default new DepartmentService();