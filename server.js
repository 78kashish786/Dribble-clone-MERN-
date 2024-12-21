import express from 'express'
import colors from 'colors'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './config/db.js';
import morgan from 'morgan'
import categoryRoutes from './Routes/categoryRoutes.js'
import authRoutes from  './Routes/authRoutes.js'
import postRoutes from './Routes/postRoutes.js'
dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/profile/category',categoryRoutes );
app.use('/api/v1/profile/post',postRoutes );

connectDB();
const PORT = process.env.PORT ||8080;
app.listen(PORT,()=>{
    console.log(`Server Running in ${process.env.DEV_MODE} mo on PORT ${PORT}`.bgBlue.white)
})
