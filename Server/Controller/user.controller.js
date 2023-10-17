import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import  Jwt from "jsonwebtoken";
import { sendError } from "../utils/error.js";

export const createUser = async (req , res , next) =>{
    const {username , email , password} = req.body;
    
    const hashedpass = bcryptjs.hashSync(password , 10);

    const newUser = new User({username , email , password: hashedpass});
    try {
        await newUser.save();
        res.json('user created');

    } catch (error) {
        next(error);
    }
        
}

export const verfiyUser = async(req , res , next) =>{
    const {email , password} = req.body;
  
    try {
    const validUser = await User.findOne({email});
    if(!validUser) return sendError(res, 404 , 'User not found');

    const validPass = bcryptjs.compareSync(password, validUser.password);
    if(!validPass) return sendError(res, 404 , 'Wrong credentials');
    
    const token = Jwt.sign({id: validUser._id} , process.env.JWT_SECRET)

    res
      .cookie('token' , token , {httpOnly: true})
      .status(200)
      .json(validUser);
        
    } catch (error) {
        next(error)
    }
}