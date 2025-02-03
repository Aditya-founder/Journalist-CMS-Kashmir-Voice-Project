import { Timestamp } from "bson";
import mongoose from "mongoose";


const postSchema = new mongoose.Schema ({
    userId:{
        type:String, 
        required:true
    },
    title:{
        type:String,
        required:true,
        unique:true
    },
    content:{
        type:String,
        required:true
    },
    
    image:{
        type:String,
        default:"https://cdn.pixabay.com/photo/2014/09/10/18/10/blogging-441005_1280.jpg"
    },
    category:{
        type:String,
        default: "uncategorized",
    },
    slug:{
        type:String, 
        unique:true,
        required:true
    }

}, {timestamps:true})


const Post = mongoose.model("Post", postSchema);

export default Post;

