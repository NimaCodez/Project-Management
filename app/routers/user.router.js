const authController = require("../http/controllers/auth.controller");
const {UserController} = require("../http/controllers/user.controller");
const { checkLogin } = require("../http/middlewares/checkLogin");

const userRouter = require("express").Router();

userRouter.get("/profile", checkLogin, UserController.GetProfile)
userRouter.post("/profile", checkLogin, UserController.EditProfile)

module.exports = userRouter