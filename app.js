import express from 'express'

import cookieParser from 'cookie-parser'
import cors from 'cors'
const app=express();

app.use(express.json({limit:"16kb"}))  
app.use(express.urlencoded({extended:true,limit:"16kb"}))  
app.use(express.static("public")) 
app.use(cookieParser()) 
app.use(cors());

import userRouter from './src/routes/user.route.js'
import { vaidateJWT } from './src/middlewares/validateJWT.js';
import taskRouter from './src/routes/task.route.js'
import categoryRouter from './src/routes/category.route.js'
app.use("/api/v1/user/",userRouter)
app.use("/api/v1/task/",vaidateJWT,taskRouter)
app.use("/api/v1/category",categoryRouter)
export {app}