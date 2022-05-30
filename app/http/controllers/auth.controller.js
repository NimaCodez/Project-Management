const { UserModel } = require("../../models/user.model");
const { hashString, obscureEmail, compareDataWithHash, generateJwtToken } = require("../../modules/utils");

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

    async Login(req, res, next) {
        req.user = null;
        req.isLoggedIn = false;
        const {username, password} = req.body;
        const user = await UserModel.findOne({username})
        if(!user) throw {status: 404, success: false, message: "Username or password do not match."}
        const result = compareDataWithHash(password, user.password)
        if(!result) throw {status: 401, success: false, message: "Username or password do not match."}
        console.log(user);
        const token = generateJwtToken(user);
        user.token = token;
        await user.save();
        req.user = user;
        req.isLoggedIn = true;
        return await res.status(200).json({
            status: 200, 
            success: true,
            message: "Welcome to Your Account!",
            token
        })
    }

    resetPassword(){

    }
}

module.exports = {
    AuthController: new AuthController()
}