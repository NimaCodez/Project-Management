const authController = require("../http/controllers/auth.controller");
const {UserController} = require("../http/controllers/user.controller");
const { checkLogin } = require("../http/middlewares/checkLogin");
const { FileUploader } = require("../modules/utils");

const userRouter = require("express").Router();

userRouter.get("/profile", checkLogin, UserController.GetProfile)
userRouter.post("/profile", checkLogin, UserController.EditProfile)
userRouter.put("/profile/upload", checkLogin, FileUploader.single("profile"), UserController.UploadProfile)

module.exports = userRouter