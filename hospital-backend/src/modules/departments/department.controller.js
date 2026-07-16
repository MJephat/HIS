import ApiResponse from "../../shared/response/response.js";
import DepartmentService from "../../modules/departments/department.service.js"
import asyncHandler from "../../shared/middleware/asyncHandler.js";

export const create = asyncHandler(async (req, res) => {

    const department = await DepartmentService.create(req.body);

    return ApiResponse.success(

        res,

        department,

        "Department created successfully",

        201

    );

});

export const findAll = asyncHandler(async (req, res) => {

    const result = await DepartmentService.findAll(req.query);

    return ApiResponse.paginated(

        res,

        result.departments,

        result.page,

        result.limit,

        result.total

    );

});

export const findOne = asyncHandler(async (req, res) => {

    const department = await DepartmentService.findOne(req.params.id);

    return ApiResponse.success(res, department);

});

export const update = asyncHandler(async (req, res) => {

    const department = await DepartmentService.update(
        req.params.id,
        req.body
    );

    return ApiResponse.success(

        res,

        department,

        "Department updated successfully"

    );

});

export const remove = asyncHandler(async (req, res) => {

    await DepartmentService.remove(req.params.id);

    return ApiResponse.success(

        res,

        null,

        "Department deleted successfully"

    );

});