const { Router } = require("express");
const userController = require("../controllers/user.controller.js");
//const uploadFiles = require("../middlewares/uploadFile.js");
//const Authinticate = require("../middlewares/authinticate.js");

const userRouter = Router();

userRouter.post("/register", userController.register);
userRouter.post("/login", userController.login);


module.exports = userRouter;
