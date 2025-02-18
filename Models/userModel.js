import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Name is required'],
    },
    email:{
        type:String,
        required:[true,'Name is required'],
        unique:'true',
    },
    password:{
        type:String,
        required:[true,'Name is required'],
    },
    phone:{
        type:String,
        required:[true,'Name is required'],
    },
    address:{
        type:String,
        required:[true,'Name is required'],
    },
    role:{
        type:Number,
        default:0,
        required:[true],
    }

}, {timestamps:true})


export default mongoose.model('users',userSchema)