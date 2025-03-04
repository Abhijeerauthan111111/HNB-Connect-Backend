const express = require("express");
const userRouter = express.Router();
const userController = require('./../controllers/userController')
const isauth = require('../config/auth')

userRouter.get("/profile", isauth, userController.getProfile);

module.exports = userRouter;