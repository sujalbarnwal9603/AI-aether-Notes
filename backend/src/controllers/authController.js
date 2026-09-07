import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";


const generateToken=(userId)=>{
    return jwt.sign(
        {userId},
        process.env.JWT_SECRET,
        {expiresIn:"7d"}
    );
};

// Register a new user

export const register = async(req, res)=>{
    try{
        const {name, email, password}= req.body;

        if(!name || !email || !password){
            return res.status(400).json({
                success:false,
                message:"Please provide all required fields"
            });
        }

        // Check password length
        if(password.length<6){
            return res.status(400).json({
                success:false,
                message:"Password must be at least 6 characters long"
            });
        }

        // Check if user already exists
        
        const existingUser = await User.findOne({email});

        if(existingUser){
            return res.status(409).json({
                success:false,
                message:"User already exists"
            });
        }

        //Hash password

        const hasedPassword = await bcrypt.hash(password, 10);

        //Create user
        const user= await User.create({
            name,
            email,
            password: hasedPassword
        });

        // Generate JWT
        const token = generateToken(user._id);

        // Store JWT in HTTP-only cookie
        res.cookie("token", token,{
            httpOnly:true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
            maxAge: 7*24*60*60*1000 // 7 days
        });

        return res.status(201). json({
            success:true,
            message:"Registration successful",
            user:{
                id: user._id,
                name: user.name,
                email: user.email,
                avatar: user.avatar
            }
        });
    } catch(error){
        console.log("Registration Failed",error);

        return res.status(500).json({
            success:false,
            message:"Server error"
        });
    }
};


// Login User

export const login = async (req,res)=>{
    try{

        const {email, password}= req.body;
        
        if(!email || !password){
            return res.status(400).json({
                success:false,
                message:"Please provide all required fields"
            })
        }

        //Find user
        const user =await User.findOne({email});

        if(!user){
            return res.status(401).json({
                success:false,
                message:"User not found"
            });
        }

        //Check password
        const  isPasswordCorrect =await bcrypt.compare(
            password,
            user.password
        );

        if(!isPasswordCorrect){
            return res.status(401).json({
                success:false,
                message:"Invalid password"
            });
        }

        // Generate JWT
        const token = generateToken(user._id);

        //Store JWT in cookie
        res.cookie("token", token,{
            httpOnly:true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
            maxAge: 7*24*60*60*1000 // 7 days
        });

        return res.status(200).json({
            success:true,
            message:"Login successful",
            user:{
                id: user._id,
                name: user.name,
                email: user.email,
                avatar: user.avatar
            }
        });

    }catch(error){
        console.log("Login Error:", error);
        return res.status(500).json({
            success:false,
            message:"Server error"
        });
    }
};

// Logout User

export const logout = (req,res)=>{

    res.clearCookie("token");

    return res.status(200).json({
        success:true,
        message:"Logout successful"
    });

};


