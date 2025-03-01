const express = require("express");
const userRouter = express.Router();
const userController = require('./../controllers/userController')

userRouter.post("/register", userController.postRegister);

module.exports = userRouter;


