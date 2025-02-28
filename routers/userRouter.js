const express = require("express");
const userRouter = express.Router();
const userController = require('./../controllers/userController')

userRouter.get("/", userController.postRegister);

module.exports = userRouter;


