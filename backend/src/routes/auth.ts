import { Router,Request,Response } from "express";
import { check, validationResult } from "express-validator";
import User from "../models/user";
import bcrypt from "bcryptjs"
import generateToken from "../utils/generateToken";
import { verifyToken } from "../middleware/auth"


const router=Router();

router.post('/login',[
    check("email","Email is required").isEmail(),
    check("password","Password with 6 or more characters required").isLength({min:6})
],async(req:Request,res:Response)=>{
const errors=validationResult(req)
if(!errors.isEmpty()){
    return res.status(400).json({msg:errors.array()[0].msg})
}
const {email,password}=req.body;
try {
    const user=await User.findOne({email})
    if(!user){
        return res.status(400).json({msg:"Invalid Credentials"})
    }
    const isMatch=await bcrypt.compare(password,user.password)
    if(!isMatch){
        return res.status(400).json({msg:"Invalid Credentials"})
    }
    
    // generating a token
    const token=generateToken(user._id)
    res.cookie("auth_token",token,{
        httpOnly:true,
        secure:process.env.NODE_ENV==="production",
        maxAge:24*60*60*1000
    }).status(200).json({userId:user._id})
} catch (error) {
    console.log(error)
    res.status(500).json({msg:"Something went wrong"})
}
})

router.get('/validate-token',verifyToken,(req:Request,res:Response)=>{
    res.status(200).json({userId:req.userId})
})

router.get('/logout',(req:Request,res:Response)=>{
    return res.cookie("auth_token","",{
        maxAge:0
    }).status(200).json({msg:"User logout successful"})
})

export default router