const { ProjectController } = require("../http/controllers/project.controller");
const { checkLogin } = require("../http/middlewares/checkLogin");
const { validationErrorMapper } = require("../http/middlewares/functions");
const {createProjectValodator, uploadProjectProfile} = require("../http/validations/project.validations");
const { mongoIdValidator } = require("../http/validations/public");
const { projectFileUploader } = require("../modules/utils");
const projectRouter = require("express").Router();

projectRouter.get("/myprojects", checkLogin, ProjectController.GetAllProjects)

projectRouter.get("/myprojects/:id", checkLogin, mongoIdValidator(), validationErrorMapper, ProjectController.GetProjectsById)

projectRouter.post("/new", checkLogin, createProjectValodator(), validationErrorMapper, ProjectController.CreateProject)

projectRouter.delete("/remove/:id", checkLogin, mongoIdValidator(), validationErrorMapper, ProjectController.RemoveProject)

projectRouter.patch("/upload/profile/:id", checkLogin, mongoIdValidator(), validationErrorMapper, projectFileUploader.single("project_profile"), ProjectController.UpdateProjectProfile)

projectRouter.patch("/edit/profile/:id", checkLogin, mongoIdValidator(), validationErrorMapper, ProjectController.UpdateProject)

module.exports = projectRouter;
