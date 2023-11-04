import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRouter from './routers/userRouter.js'
import authRouter from './routers/authRouter.js'
import cookieParser from 'cookie-parser'
dotenv.config()
const app = express();
app.use(express.json());
app.use(cookieParser());

mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("MongoDb connected successfully")
}).catch((error)=>{
    console.log("Error in connecting MongoDb",error)
})

const PORT = process.env.PORT || 3000 

app.listen(PORT, ()=>{
    console.log(`Server is running at port ${PORT}`)
})

app.use('/api/user', userRouter)
app.use('/api/auth', authRouter)

// Creating a middleware to handle the errors

app.use((err,req,res,next) => {
    const statusCode = err.statusCode || 500
    const message = err.message || "Internal server error"
    return res.status(statusCode).json({
        success: false,
        message: message,
        statusCode:statusCode
    })
})