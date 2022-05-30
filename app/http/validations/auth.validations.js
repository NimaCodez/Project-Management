const {body} = require('express-validator');
const {UserModel} = require('../../models/user.model');

function registerValidator() {
    return [
        body("username").custom(async (value, ctx) => {
            if(value) {
                const usernameRegex= /^[a-z]+[a-z0-9\_\.]{2,}/gi
                if(usernameRegex.test(value)) {
                    let user = await UserModel.findOne({username: value})
                    if(user) throw "username is already in use"
                    return true
                }
                throw "Username must start with a letter and can have upper/lower case letters, numbers, underscores and periods";
            }
            throw "Username Cannot be empty"
        }),
        body("email").isEmail().not().withMessage('Input Email Is not a valid email address')
        .custom(async email => {
            const user = await UserModel.findOne({email})
            if(user) throw "Email is already in use";
        }),
        body("mobile").isMobilePhone("fa-IR").not().withMessage('Input Phone Number Is not a valid')
        .custom(async mobile => {
            const user = await UserModel.findOne({mobile})
            if(user) throw "Phone Number already in use";
        }),
        body("password").isLength({min: 6, max: 16}).withMessage("Passowrd must be at least 6 characters and less than 16 characters").custom((value, ctx) => {
            if(!value) throw "Password Cannot be empty";
            if (value !== ctx?.req?.body?.password_confirm) throw "Password And Its Confirm Are Not The Same";
            return true
        })
    ]
}

function loginValidator() {
    return [
        body("username").notEmpty().withMessage("Username cannot be empty").custom(username => {
            const usernameRegex= /^[a-z]+[a-z0-9\_\.]{2,}/gi
            if(usernameRegex.test(username)) {
                return true
            }
            throw "Username must start with a letter and can have upper/lower case letters, numbers, underscores and periods";
        }),
        body("password").notEmpty().withMessage("Password cannot be empty").isLength({min: 6, max: 16}).withMessage("Password must be at least 6, and less than 16 characters")
    ]
}

module.exports = {
    registerValidator,
    loginValidator,
}
