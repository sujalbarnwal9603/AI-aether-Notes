import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

import connectDB from "./src/db/connectDB.js";

dotenv.config();

const app=express();

const PORT=process.env.PORT || 5000;

//Database connection

connectDB();

//Middlewares
app.use(
    cors({
        origin:process.env.CLIENT_URL,
        credentials:true
    })
);


app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

import authRoutes from "./src/routes/authRoutes.js";

app.use("/api/auth", authRoutes);



// Health check
app.get("/", (req,res)=>{
    res.json({
        success:true,
        message:"Aether AI Notes API is running",
        version:"1.0.0"
    });
});

//Server listening
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})