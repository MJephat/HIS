import departmentService from "../departments/department.service.js";
import DepartmentService from "../departments/department.service.js"

export const create = async (req, res) => {
    try {
        const department = await  DepartmentService.create(req.body);

        res.status(201).json({
            success: true,
            message: "Department created successfully.",
            data: department,
        });
        } catch (err) {
        
        console.log("Department Error:", err);

        return res.status(500).json({
            success: false,
            message: err.message,
            // stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
        });

    }
};

export const findAll = async (req, res) => {
    try{
        const department = await DepartmentService.findAll(
            req.query
        );

        res.json({
            success: true,
            data: department,
        });
    } catch (err){
        res.status(500).json({
            success: false,
            message: err.message,
        })
    }
};

export const findOne = async (req, res) => {
    try{
        const depart = await DepartmentService.findOne(req.param.id);
        res.json({
            success: true,
            data: department,
        });
    }catch(err){
        res.status(404).json({
            success: false,
            message: err.message,
        })
    }
};

export const update = async (req, res) => {
    try{
        const department = await DepartmentService.update(
            req.params.id,
            req.body
        );

        res.json({
            success: true,
            message: "Updated.",
            data: department,
        });
    } catch (err){
        res.status(400).json({
            success: false,
            message: err.message,
        });
    }
}

export const remove = async (req, res) => {
    try{
        await DepartmentService.remove(req.params.is);

        res.json({
            success: true,
            message: "Department deleted.",
        });
    } catch(err){
        res.status(400).json({
            success:false,
            message: err.message,
        })
    }
}