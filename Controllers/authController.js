import { comparePassword, hashPassword } from "../Helpers/authHelpers.js";
import userModel from "../Models/userModel.js";
import JWT from 'jsonwebtoken'


export const registerPOSTController =async(req,res)=>{
    try {

        const {name,email,password,phone,address}=req.body;
        
        if(!email){return res.send({message:'Email is required'})};
        if(!name){return res.send({message:'Name is required'})};
        if(!password){return res.send({message:'Password is required'})};
        if(!phone){return res.send({message:'Phone is required'})};
        if(!address){return res.send({message:'Address is required'})};
        // existing user

        const existingUser = await userModel.findOne({email});
        if(existingUser){
            res.status(500).send({
                success:false,
                message:"User Already Exist , Please Login"
            })
        }
        
        const hashedPassword = await hashPassword(password);
        

        // save;
        const user = await  new userModel({name,email,password:hashedPassword,phone,address}).save();

        res.status(201).send({
            success:true,
            message:`${name} is registered Successfully`,
            user
        })
    } catch (err) {
        console.log(err);
        res.status(500).send({
            success:false,
            message:'Error in Registeration',
            err
        })
    }
}

export const loginPOSTController = async(req,res)=>{
    try {
        
        const {email,password} = req.body;
        if(!email || !password){
            return res.send({message:'Invalid Email or Password'})
        }

      const user = await userModel.findOne({email});
      if(!user){
        return res.status(200).send({
            success:false,
            message:'Email is not registerd',
        })
      }


        const match = await comparePassword(password,user.password);

        if(!match){
            return res.status(200).send({
                success:false,
                message:"Invalid Credentials",
            })
        }

        const token =  JWT.sign({_id:user._id  }, process.env.SECRET_JWT,{expiresIn:'2d'})

        res.status(200).send({
            success:true,
            message:"Login Successfull",
            user,
            token
        })

     

    } catch (err) {
        console.log(err);
        res.status(500).send({
            success:false,
            message:"Error in LoginPOSTContoller"
        })
    }
}

export const testGETController = async(req, res)=>{
    try{
        console.log('Route Protected');
        res.status(200).send({
            success:true,
            message:"Protected Route"
        })
    }catch(err){
        console.log(err)
        res.status(500).send({
            success:false,
            message:"No Get Elemtns"

        })
    }
}