const { body, param } = require("express-validator");
const { isValidObjectId } = require("mongoose");

function createProjectValodator() {
    return [
        body("title").not().isEmpty().withMessage("Project title is required"),
        body("text").isLength({ min: 10 }).withMessage("project text is required and must be at least 10 characters")
    ]
}

function uploadProjectProfile() {
    return [
        body("project_profile").not().isEmpty().withMessage("Please Choose an image"),
    ]
}

module.exports = {createProjectValodator, uploadProjectProfile};