const { body } = require("express-validator");

function createProjectValodator() {
    return [
        body("title").not().isEmpty().withMessage("Project title is required"),
        body("text").isLength({ min: 10 }).withMessage("project text is required and must be at least 10 characters")
    ]
}

function uploadProjectProfile() {
    return [
        body("project_profile").not().isEmpty().withMessage("Please Choose an image"),
        body("tags").isLength({min: 0, max: 10}).withMessage("A Project Cannot have more than 10 tags")
    ]
}

module.exports = {createProjectValodator, uploadProjectProfile};