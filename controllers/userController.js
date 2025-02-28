// import { User } from "../models/User.js";
const User = require("../models/User");
const bcryptjs = require("bcryptjs");


exports.postRegister=async(req,res)=>{
try {
    const { email,username,fullname,bio,department,graduationYear,password} = req.body;
    // basic validation
    if (!fullname || !username || !email || !department || !graduationYear || !password) {
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
        fullname,
        username,
        email,
        password: hashedPassword,
        department,
        graduationYear,

    });
    return res.status(201).json({
        message: "Account created successfully.",
        success: true
    })

} catch (error) {
    console.log(error);
} 
}
