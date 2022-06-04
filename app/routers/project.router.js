const { ProjectController } = require("../http/controllers/project.controller");
const { checkLogin } = require("../http/middlewares/checkLogin");
const { validationErrorMapper } = require("../http/middlewares/functions");
const {createProjectValodator} = require("../http/validations/project.validations");
const projectRouter = require("express").Router();

projectRouter.post("/new", checkLogin, createProjectValodator(), validationErrorMapper, ProjectController.CreateProject)

module.exports = projectRouter;
