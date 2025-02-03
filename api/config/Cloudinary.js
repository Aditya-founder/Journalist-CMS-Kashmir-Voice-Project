import { v2 as Cloudinary } from "cloudinary";

export const cloudinaryConnect = ()=>{
    try{
        Cloudinary.config({
            cloud_name: process.env.CLOUD_NAME,
			api_key: process.env.API_KEY,
			api_secret: process.env.API_SECRET,

        })
        console.log("cloudinary is connectedd succeffully")
    }catch(error){
        console.log(error);

    }
}