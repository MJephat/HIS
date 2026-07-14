import bcrypt from "bcrypt";
import { findUserByEmail, creatorUser } from "./auth.repository.js";
import { generateAccessToken, generateRefreshToken } from "./auth.utils.js";
import { json } from "express";

export const registerUser = async (payload) => {
    const existingUser = await findUserByEmail(payload.email);

    if (existingUser) {
        throw new Error('User already exists');
    }

    const password  = await bcrypt.hash(payload.password, 10);
    const user = await creatorUser({ ...payload, password });

    return { user, 
        accessToken: generateAccessToken(user), 
        refreshToken: generateRefreshToken(user) 
    };
};