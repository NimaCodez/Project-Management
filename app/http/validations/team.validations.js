const { body } = require("express-validator");

function createTeamValidator() {
    return [
        body("name").isLength({min: 2, max: 50}).withMessage("Team name must be at least 2 characters and less than 50 characters"),
        body("username").isLength({min: 5, max: 25}).withMessage("Username must be at least 5 characters and less than 25 characters").custom((value, ctx) => {
            const usernameRegex = /^[a-zA-Z0-9\.\_\-]/gim;
            if(!usernameRegex.test(value)) throw {status: 400, success: false, message: "Invalid username"};
            if(!value) throw {status: 400, success: false, message: "username cannot be empty"};
            return true
        }),
        body("description").isLength({min: 2, max: 175}).withMessage("Description must be at least 2 characters and less than 175 characters"),
    ]
}

module.exports = {
    createTeamValidator,
}