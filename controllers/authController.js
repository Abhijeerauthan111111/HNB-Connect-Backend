// import { User } from "../models/User.js";
const User = require("../models/User");
const bcryptjs = require("bcryptjs");
const jwt = require('jsonwebtoken');

//register new user

exports.postRegister = async(req, res, next) => {
    try {
        console.log("User came for signup", req.body)
        const { email, fullName, department, graduationYear, password } = req.body;
        
        // basic validation
        if (!fullName || !email || !password || !department || !graduationYear) {
            return res.status(401).json({
                message: "All fields are required.",
                success: false
            })
        }



        // Generate username from email dheeraj_21134501038@hnbgu.edu.in to dheeraj8301
        const baseUsername = email.split('@')[0];   

        const [name, number] = baseUsername.split('_');

        const last4Digits = number.slice(-4);

        const username = name+last4Digits;
        

        //checking role
        let role = "student";

        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth();

        if(graduationYear < currentYear ){
            role = "alumni";

        }
        else if (graduationYear == currentYear){
            if(currentMonth > 5){
                
                role = "alumni";

            }
                  
        }



        
        // Check for existing email
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(401).json({
                message: "Email already exists",
                success: false
            });
        }
           
        //password hashing
        const hashedPassword = await bcryptjs.hash(password, 16);

        //creating new user 
        const user = new User({
            fullName,
            username, 
            email,
            password: hashedPassword,
            department,
            graduationYear,
            role
        });
        
        await user.save();

        return res.status(201).json({
            message: "Account created successfully.",
            success: true,
            role: user.role
        });

    } catch (error) {
        console.log(error);
        
        return res.status(500).json({
            message: "Server Error Occurred",
            success: false
        });
    }
};

exports.postLogin = async(req, res, next) => {
    try {
        // Add token secret verification
        if (!process.env.TOKEN_SECRET) {
            throw new Error('TOKEN_SECRET is not defined in environment variables');
        }

        
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(401).json({
                message: "All fields are required.",
                success: false
            })
        };


        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                message: "Incorrect email or password",
                success: false
            })
        }


        const isMatch = await bcryptjs.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                message: "Incorect email or password",
                success: false
            });
        }

        //generating JWT Token
        const tokenData = {
            userId: user._id,
            email: user.email
        };

        // This creates a signed token with your secret key
        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET, { 
            expiresIn: "1d" // Token expires in 1 day
        });

        // This sets the token as a cookie in the browser
        res.cookie("token", token, { 
            httpOnly: true, // Can't be accessed by JavaScript
            secure: process.env.NODE_ENV === 'production', // HTTPS only in production
            maxAge: 24 * 60 * 60 * 1000 // Cookie expires in 1 day
        });
        
        return res.status(200).json({
                message: `Welcome back ${user.fullName}`, // Changed from user.name to user.fullName
                user: {
                id: user._id,
                email: user.email,
                fullName: user.fullName,
                role: user.role
            },
                success: true
           });
 
    } 
    catch (error) {
    console.log(error);
    return res.status(500).json({
    message: error.message || "Server error occurred",
    success: false
    });
}
};

exports.getLogout = async (req, res) => {
    try {
        // Clearing token cookie
        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'development'
        });

        return res.status(200).json({
            message: "Logged out successfully",
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Error during logout ",
            success: false
        });
    }
};