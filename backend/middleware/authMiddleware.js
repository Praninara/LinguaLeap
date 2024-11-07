import jwt from "jsonwebtoken";
import asyncHandler from "./asyncHandler.js";

import User from "../models/userModel.js";

export const protect = asyncHandler(async (req,res,next)=>{
    let token = req.cookies.jwt;
    if(token){
        try {
            const decoded = jwt.verify(token,process.env.JWT_SECRET);
            req.user = await User.findById(decoded.userId).select('-password');
            next();
        } catch (error) {
            console.log(error);
            res.status(401);
            throw new Error('Not authorised,token not authorized');
            
        }
    }else{
        res.status(401);
        throw new Error('Not authorised,token required');
    }
});

export const admin = (req,res,next)=>{
    console.log(req.user);
    console.log(req.user.isAdmin);
    if(req.user && req.user.isAdmin){
        next()
 
    }else{
        res.status(401);
        throw new Error('This is only accessible to admins');
    }
}
