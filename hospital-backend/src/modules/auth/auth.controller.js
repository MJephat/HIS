import { registerUser } from "./auth.service.js";

export const register = async (req, res, next) => {
    try{
        const result = await registerUser(req.body);
        res.status(201).json(result);
    } catch (error) {
            return res.status(400).json({ message: error.message });

    }
}