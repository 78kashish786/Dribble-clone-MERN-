import mongoose from "mongoose";

const postSchema = new  mongoose.Schema({

    postedBy:{
        type:mongoose.ObjectId,
        ref :'users',
        required:true,
    },
    title:{
        type:String,
        required:true,
    },
    slug:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    category:{
        type:mongoose.ObjectId,
        ref:'Category',
        required:true,
    },
    price:{
        type:String,

    },
    photo:{
        data:Buffer,
        contentType:String,
    }

}, {timestamps:true}) 

export default mongoose.model('posts', postSchema)