import mongoose, { mongo } from 'mongoose'
import colors from 'colors'

const connectDB = async(req,res)=>{
    try {

        const conn = await mongoose.connect(`${process.env.DB}`)
        console.log(`Database connected Successfully on ${conn.connection.host}`.bgGreen.white)
        
    } catch (err) {
        console.log(err);
    }
}

export default connectDB;