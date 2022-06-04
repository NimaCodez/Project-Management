const { ProjectController } = require("../http/controllers/project.controller");
const { checkLogin } = require("../http/middlewares/checkLogin");
const { validationErrorMapper } = require("../http/middlewares/functions");
const {createProjectValodator, uploadProjectProfile} = require("../http/validations/project.validations");
const { projectFileUploader } = require("../modules/utils");
const projectRouter = require("express").Router();

projectRouter.post("/new", checkLogin, createProjectValodator(), validationErrorMapper, ProjectController.CreateProject)

projectRouter.patch("/upload/profile", checkLogin, projectFileUploader.single("project_profile"), ProjectController.UpdateProject)

module.exports = projectRouter;
