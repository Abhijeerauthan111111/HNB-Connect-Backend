// import { User } from "../models/User.js";
const User = require("../models/User");
const bcryptjs = require("bcryptjs");


exports.postRegister=async(req,res)=>{
try {
    const { email,userName,fullName,bio,department,graduationYear,password} = req.body;
    // basic validation
    if (!fullName || !userName || !email || !password || !department || !graduationYear) {
        return res.status(401).json({
            message: "All fields are required.",
            success: false
        })
    }
    const user = await User.findOne({ email });
    if (user) {
        return res.status(401).json({
            message: "User already exist.",
            success: false
        })
    }
    const hashedPassword = await bcryptjs.hash(password, 16);

    await User.create({
        fullName,
        userName,
        email,
        password: hashedPassword,
        department,
        graduationYear,

    });
    return res.status(201).json({
        message: "Account created successfully.",
        success: true
    })

} 

catch (error) {
    console.log(error);
    return res.status(500).json({
        message: "Server Error Occurred",
        success : false
    })
} 
}
