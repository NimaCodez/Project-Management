const { param } = require("express-validator")

function mongoIdValidator () {
    return [
        param("id").isMongoId().not().withMessage("Id in not a valid one!")
    ]
}

module.exports = {
    mongoIdValidator,
}