const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config({
    path:"../config/.env"
})

const isAuthenticated = async (req,res,next) => {
    try {
        const token = req.cookies.token; 
        if(!token){
            return res.status(401).json({
                message:"User not authenticated.",
                success:false
            })
        }
        const decode = await jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = decode.userId;
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            message: "Authentication failed",
            success: false
        });
    }
}
module.exports = isAuthenticated;