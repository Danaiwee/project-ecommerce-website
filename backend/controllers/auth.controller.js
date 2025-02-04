import jwt from 'jsonwebtoken';

import User from "../models/user.model.js";
import {
  generateTokens,
  storeRefreshToken,
  setCookies,
} from "../lib/generateTokenandCookies.js";
import { redis } from '../lib/redis.js';

export const signup = async(req, res) => {
    try {
        const {name, email, password} = req.body;

        const isExisting = await User.findOne({email});
        if(isExisting){
            return res.status(400).json({message: "User is already exsits"})
        };

        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const isValidEmail = regex.test(email);
        if(!isValidEmail){
            return res.status(400).json({message: "Invalid Email"})
        };
    
        const user = await User.create({name, email, password});
    
        //generateToken
        const {accessToken, refreshToken} = generateTokens(user._id);
    
        //store refreshToken
        await storeRefreshToken(user._id, refreshToken);
    
        //create cookies
        setCookies(res, accessToken, refreshToken);
        
        return res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        });
    } catch (error) {
        console.log("Error in signup controller: ", error.message);
        res.status(500).json({message: error.message})
    } 
};

export const login = async(req, res) => {
    try {
        const {email, password} = req.body;

        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({message: "Invalid email or password"})
        };

        const isPasswordValid = await user.comparePassword(password);
        if(!isPasswordValid){
            return res.status(400).json({message: "Invalid email or password"})
        };

        //generateToken
        const {accessToken, refreshToken} = generateTokens(user._id);

        //store refreshToken to redis
        await storeRefreshToken(user._id, refreshToken);

        //create cookies
        setCookies(res, accessToken, refreshToken);

        return res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        });
    } catch (error) {
        console.log("Error in login controller: ", error.message);
        res.status(500).json({message: error.message});
    }
};

export const logout = async(req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if(!refreshToken){
            return res.status(404).json({message: "refreshToken not found"})
        };

        //delete token in redis
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        await redis.del(`refresh_token:${decoded.userId}`);

        //delete cookies
        res.clearCookie("accessToken");
        res.clearCookie("refreshToken");

        return res.status(200).json({message: "Logged out successfully"})
        
    } catch (error) {
        console.log("Error in logout controller: ", error.message);
        res.status(500).json({message: error.message});
    }
};

export const refreshAccessToken = async(req,res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if(!refreshToken){
            return res.status(404).json({message: "refreshToken not found"})
        };

        //Check refreshToken in redis
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        const storedToken = await redis.get(`refresh_token:${decoded.userId}`);
        if(storedToken !== refreshToken){
            return res.status(401).json({message: "invalid refresh token"})
        };

        //generate new accessToken
        const accessToken = jwt.sign({userId: decoded.userId}, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '15m'
        });
        
        //create new cookie
        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV || 'production',
            sameSite: 'strict',
            maxAge: 15*60*1000 // 15 minutes
        });

        return res.json({message: "accessToken refresh successfully "})
    } catch (error) {
        console.log('Error in refreshAccessToken controller: ', error.message);
        res.status(500).json({message: error.message})
    };
};

//Todo
// export const getProfile = async(req,res) => {};
