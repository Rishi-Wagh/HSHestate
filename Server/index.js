import express  from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from './routes/Auth.route.js';
import {errorHandler} from "./utils/error.js"

dotenv.config();
const app = express();
app.use(express.json());

//Routes
app.use('/api/auth', userRouter);

//middlewear
app.use(errorHandler);

//Connection to db
 mongoose.connect(process.env.MONGO_URL)
   .then(() =>{
     console.log('connected to DB...')
   })
   .catch((err) => {
    console.log(err);
   })

//Connection to port   
app.listen(3000 , ()=>{
    console.log('running on 3000!')
})