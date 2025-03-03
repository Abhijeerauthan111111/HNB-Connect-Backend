const express = require("express");
const authRouter = express.Router();
const authController = require('./../controllers/authController')
const isauth = require('../config/auth')

authRouter.post("/register", authController.postRegister); 
authRouter.post("/login", authController.postLogin);
authRouter.get("/logout", isauth, authController.getLogout);

module.exports = authRouter;


