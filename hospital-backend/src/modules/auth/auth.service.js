import bcrypt from "bcrypt";
import { findUserByEmail, createUser, findUserById } from "./auth.repository.js";
import { generateAccessToken, generateRefreshToken } from "./auth.utils.js";
import e, { json } from "express";

export const registerUser = async (payload) => {
    const existingUser = await findUserByEmail(payload.email);

    if (existingUser) {
        throw new Error('User already exists');
    }

    const password  = await bcrypt.hash(payload.password, 10);
    const user = await creatorUser({ ...payload, password });
    const expiredAt = new Date();
    expiredAt.setDate(expiredAt.getDate() + 30); // Set expiration date to 30 days from now

    return { user, 
        accessToken: generateAccessToken(user), 
        refreshToken: generateRefreshToken(user),
        ExpiresAt: expiredAt
    };

    delete user.password; // Remove password from the user object before returning
    return { user,
         accessToken: generateAccessToken(user), 
         refreshToken: generateRefreshToken(user), 
         ExpiresAt: expiredAt 
        };

};

export const loginUser = async (email, password) => {
    const user = await findUserByEmail(email);

    if (!user) {
        throw new Error('User not found');
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
        throw new Error('Invalid password');
    }

    const expiredAt = new Date();
    expiredAt.setUTCDate(expiredAt.getUTCDate() + 30);

    //expiredAt.setDate(expiredAt.getDate() + 30); // Set expiration date to 30 days from now

    return { user,
         accessToken: generateAccessToken(user), 
         refreshToken: generateRefreshToken(user), 
         ExpiresAt: expiredAt 
        };
}

// me
export const getMe = async (id) => {

    const user = await findUserById(id);

    if (!user)
        throw new Error("User not found.");

    delete user.password;

    return user;

}