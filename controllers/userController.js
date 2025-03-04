const User = require("../models/User");
const bcryptjs = require("bcryptjs");
const jwt = require('jsonwebtoken');



exports.getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user).select('-password');
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false
            });
        }
        
        res.status(200).json({
            message: "profile found",
            success: true,
            user
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error fetching profile",
            success: false
        });
    }
};

