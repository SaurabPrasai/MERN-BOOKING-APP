import express,{Request,Response} from "express"
import User from "../models/user"
import {check,validationResult} from "express-validator"
import generateToken from "../utils/generateToken"

const router=express.Router()

router.post('/register',[
    check("firstName","First Name is required").isString(),
    check("lastName","Last Name is required").isString(),
    check("email","Email is required").isEmail(),
    check("password","Password with 6 or more characters required").isLength({min:6})
],async(req:Request,res:Response)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({msg:errors.array()})
    }
try {
    let user=await User.findOne({
        email:req.body.email
    })
    if(user){
        return res.status(400).json({msg:"User already exists"})
    }
    user=new User(req.body)
    await user.save();

    // generating a token
    const token=generateToken(user._id)
    
    res.cookie("auth_token",token,{
        httpOnly:true,
        secure:process.env.NODE_ENV==="production",
        maxAge:24*60*60*1000
    }).status(200).json({msg:"User registered Successfully"})
} catch (error) {
    console.log(error)
   res.status(500).json({msg:"Something went wrong"})
}
})


export default router