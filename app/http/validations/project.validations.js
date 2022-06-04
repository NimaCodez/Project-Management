const { body } = require("express-validator");

function createProjectValodator() {
    return [
        body("title").not().isEmpty().withMessage("Project title is required"),
        body("text").isLength({ min: 10 }).withMessage("project text is required and must be at least 10 characters")
    ]
}

module.exports = {createProjectValodator};