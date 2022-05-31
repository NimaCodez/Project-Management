const { UserModel } = require("../../models/user.model")
const { verifyToken } = require("../../modules/utils")

const checkLogin = async (req, res, next) => {
    try {
        const authorization = req?.headers?.authorization;
        if(!authorization) throw { status: 401, success: false, message: "Please log in to your account" }
        let token = authorization.split(" ")?.[1]
        if (!token) throw { status: 401, success: false, message: "Please log in to your account" }
        const { username } = verifyToken(token)
        if (!username) throw { status: 401, success: false, message: "Please log in to your account" }
        const user = await UserModel.findOne({ username }, { password: 0, createdAt: 0, updatedAt: 0, __v: 0 })
        if (!user) throw { status: 401, success: false, message: "Please log in to your account" }
        req.user = user;
        next()
    } catch (error) {
        next(error)
    }
}

module.exports = {
    checkLogin
}