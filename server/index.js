import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRouter from './routers/userRouter.js'
import authRouter from './routers/authRouter.js'
import listingRouter from './routers/listingRouter.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'
// import path from 'path';

dotenv.config()
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());

mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("MongoDb connected successfully")
}).catch((error)=>{
    console.log("Error in connecting MongoDb",error)
})


// const __dirname = path.resolve();

const PORT = process.env.PORT || 3000 

app.listen(PORT, ()=>{
    console.log(`Server is running at port ${PORT}`)
})

app.use('/api/user', userRouter)
app.use('/api/auth', authRouter)
app.use('/api/listing', listingRouter)

// app.use(express.static(path.join(__dirname, '/client/dist')));

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
// })

app.get('*',(req,res,next)=>{
    res.status(200).json({
      message:'bad request'
    })
  })

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