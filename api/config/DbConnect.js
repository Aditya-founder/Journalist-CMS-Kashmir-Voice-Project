import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();


export const dbConnect= ()=>{
    mongoose.connect(process.env.MONGO_DB)
    .then(()=>{console.log("db connected succesffuly")})
    .catch((error)=>{
        console.log("db connection failed")
        console.error(error);
        process.exit(1);
    })
}
