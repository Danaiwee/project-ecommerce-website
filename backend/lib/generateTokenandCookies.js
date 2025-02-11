import jwt from 'jsonwebtoken';

import {redis} from './redis.js';

//For create bith accessToken and refreshToken
export const generateTokens = (userId) => {
    const accessToken = jwt.sign({userId}, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "15m"
    });

    const refreshToken = jwt.sign({userId}, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: "7d"
    });

    return {accessToken, refreshToken}
};


//For store refreshToken in redis (name, tokenToStore, expired)
export const storeRefreshToken = async(userId, refreshToken) =>{
    await redis.set(`refresh_token:${userId}`, refreshToken, 'EX', 7*24*60*60);
};


//Set the cookies (accessToken cookie and refreshToken cookie)
export const setCookies = (res, accessToken, refreshToken) => {
    res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV || "production",
        sameSite: "strict",
        maxAge: 15*60*1000 // 15 minutes
    });

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV || "production",
        sameSite: 'strict',
        maxAge: 7*24*60*60*1000 // 7 days
    });
};

