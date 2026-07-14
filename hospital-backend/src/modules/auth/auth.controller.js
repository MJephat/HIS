import { getMe, loginUser, registerUser } from "./auth.service.js";

export const register = async (req, res, next) => {
    try{
        const result = await registerUser(req.body);
        res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: result,
        });
    } catch (error) {
            return res.status(400).json({
                 success: false, 
                 message: error.message 
                });

    }
}

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const result = await loginUser(email, password);
        res.status(200).json({
            success: true,
            message: "User logged in successfully",
            data: result
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
}

export const Me = async (req, res, next) => {
    try {
        const user = await getMe(req.user.id);
        res.status(200).json({
            success: true,  
            data: user
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
}
