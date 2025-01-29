import jwt from 'jsonwebtoken';
import {errorHandler} from './error.js';
import dotenv from 'dotenv';
dotenv.config();

export const verifyToken = (req, res, next)=>{
    const token = req.cookies.access_token;
    // console.log("token in verufiy user ", token);
    if(!token){
        return next(errorHandler(401, "unauthorized"));
    }
        jwt.verify(token, process.env.JWT_SECRET, (err, user)=>{
            if(err){
                return next(errorHandler(401, "unauthorized"));
            }
            req.user = user;
            console.log("verifu user ", user);

            next();
        })

    
}
