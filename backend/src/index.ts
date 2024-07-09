import express,{Request,Response} from "express"
import cors from "cors"
import "dotenv/config"
import mongoose from "mongoose"
import userRouter from './routes/users'
import authRouter from "./routes/auth"
import myHotelRouter from "./routes/my-hotels"
import hotelRouter from "./routes/hotel"
import cookieParser from "cookie-parser"
import path from "path"
import {v2 as cloudinary} from "cloudinary"

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
})

const app=express()



//database connection
mongoose.connect(process.env.MONGO_CONNECTION_STRING as string)
.then(()=>console.log("MongoDB Connected",process.env.MONGO_CONNECTION_STRING))
.catch((err)=>console.log(err))

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use(cors({
    origin:process.env.FRONTEND_URL,
    credentials:true
}))

app.use(express.static(path.join(__dirname,"../../frontend/dist")))
app.use('/api/user',userRouter)
app.use('/api/auth',authRouter)
app.use('/api/my-hotels',myHotelRouter)
app.use('/api/hotels',hotelRouter)

// app.get("/api/test",async(req:Request,res:Response)=>{
// res.json({msg:"Hello From the test endpoint"})
// })

app.listen(3000,()=>{
    console.log("Listening On port 3000")
})

