const {body} = require('express-validator');

function registerValidator() {
    return [
        body("username").custom((value, ctx) => {
            if(value) {
                const usernameRegex= /^[a-z]+[a-z0-9\_\.]{2,}/gi
                if(usernameRegex.test(value)) {
                    return true
                }
                throw "Username must start with a letter and can have upper/lower case letters, numbers, underscores and periods";
            }
            throw "Username Cannot be empty"
        }),
        body("email").isEmail().not().withMessage('Input Email Is not a valid email address'),
        body("mobile").isMobilePhone("fa-IR").not().withMessage('Input Phone Number Is not a valid'),
        body("password").isLength({min: 6, max: 16}).withMessage("Passowrd must be at least 6 characters and less than 16 characters").custom((value, ctx) => {
            if(!value) throw "Password Cannot be empty";
            if (value !== ctx?.req?.body?.password_confirm) throw "Password And Its Confirm Are Not The Same";
            return true
        })
    ]
}

module.exports = {
    registerValidator,
}
