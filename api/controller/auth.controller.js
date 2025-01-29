import User from '../models/user.model.js';
import bcryptjs from "bcryptjs";
import { errorHandler } from '../utils/error.js';
import { error } from 'console';
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();


export const signup = async(req, res, next)=>{

    try{

    const {username ,email, password} = req.body;

    if(!username || !email || !password | username==='' || email==='' || password===''){
        next(errorHandler(400, "all field are required"));
    }

    //hash the password 

    const existingUser =  await User.findOne({email});
    if(existingUser){
       return  res.json({
            message:"User already exit"
            })
    }


    const hashpassword = await bcryptjs.hashSync(password, 10);

    const newUser = new User({
        username,
        email,
        password : hashpassword
    })

    //save in datqbae
    await newUser.save();

    return res.json({
        message:"successaful sign up ",
        data:newUser
    })
    
    
}
catch(error){
    next(error);
}
}


export const signin =async(req, res, next)=>{
    try{
        const{email, password} = req.body;
        if(!email || !password){
            next(errorHandler(400, "all field are required"));
        }
        const validuser = await User.findOne({email});

        if(!validuser){
            return next(errorHandler(404, "user not Found"));
        }
        const validpassword = await bcryptjs.compareSync(password, validuser.password);
        if(!validpassword){
            return next(errorHandler(400, "invalid password"));
        }
        
        const token =  jwt.sign({id:validuser._id}, process.env.JWT_SECRET);

        // console.log("token ", token);

        const {password: pass, ...rest} = validuser._doc;

        //cookie me send kro token ko 
        res.status(200).cookie('access_token', token, {
            httpOnly :true,
        }).json(rest);

    }
    catch(error){
        next(error);
    }
}


export const google = async(req, res , next)=>{
   
    const {email, name, googlePhotoUrl} = req.body
    try{

        const user  = await User.findOne({email});
        if(user){
            const token = jwt.sign({id:user._id}, process.env.JWT_SECRET);
            
            const{password, ...rest} = user._doc;

            res.status(200).cookie('access-token', token, {
                httpOnly :true,
            }).json(rest);
        }
        else{
            const generatedPassword = Math.random().toString(36).slice(-8)+Math.random().toString(36).slice(-8);

            console.log(generatedPassword);
            const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);

            const newUser = new User({
                username : name.toLowerCase().split(' ').join('')+Math.random().toString(9).slice(-4),
                email, 
                password: hashedPassword,
                profilePicture : googlePhotoUrl
            });

            await newUser.save();

            const token = jwt.sign({id:newUser._id}, process.env.JWT_SECRET);
            const{password, ...rest} = newUser._doc;

            res.status(200).cookie('access-token', token, {
                httpOnly:true,
            }).json(rest);
        }
    }catch(error){
        next(error);
    }
   
}