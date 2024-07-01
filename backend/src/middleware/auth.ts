import { NextFunction, Request,Response } from "express"
import jwt, { JwtPayload } from "jsonwebtoken"


// extensing Request
declare global{
    namespace Express{
        interface Request{
            userId:string
        }
    }
}

export const verifyToken=(req:Request,res:Response,next:NextFunction)=>{
const token=req.cookies.auth_token
if(!token){
    return res.status(401).json({msg:"Unauthorized"})
}
try {
const decoded=jwt.verify(token,process.env.JWT_SECRET_KEY as string)
if(!decoded){
    return res.status(401).json({msg:"Invalid Token"})
}
req.userId=(decoded as JwtPayload).userId
next()
} catch (error) {
    res.status(500).json({msg:"Something went wrong!"})
}
}