const { validationResult } = require("express-validator");
const { UserModel } = require("../../models/user.model");
const { hashString, obscureEmail } = require("../../modules/utils");
const { validationErrorMapper } = require("../middlewares/functions");

class AuthController {
    async Register(req, res, next) {
        const { mobile, username, password, password_confirm, email } = req.body;
        const createResult = await UserModel.create({
            username,
            password: hashString(password),
            email,
            mobile,
        })
        if(createResult) {
            return res.status(201).json({
                status: 201,
                success: true,
                email: obscureEmail(createResult.email),
                message: `Your Account Was created Successfuly with username: ${createResult.username}`
            })
        }
    }

    Login(){

    }

    resetPassword(){

    }
}

module.exports = {
    AuthController: new AuthController()
}