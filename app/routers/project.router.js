const { ProjectController } = require("../http/controllers/project.controller");
const { checkLogin } = require("../http/middlewares/checkLogin");
const { validationErrorMapper } = require("../http/middlewares/functions");
const {createProjectValodator, uploadProjectProfile} = require("../http/validations/project.validations");
const { mongoIdValidator } = require("../http/validations/public");
const { projectFileUploader } = require("../modules/utils");
const projectRouter = require("express").Router();

projectRouter.get("/myprojects", checkLogin, ProjectController.GetAllProjects)

projectRouter.get("/:id", checkLogin, mongoIdValidator(), ProjectController.GetProjectsById)

projectRouter.post("/new", checkLogin, createProjectValodator(), validationErrorMapper, ProjectController.CreateProject)

projectRouter.delete("/remove/:id", checkLogin, mongoIdValidator(), ProjectController.RemoveProject)

projectRouter.patch("/upload/profile/:id", checkLogin, mongoIdValidator(), projectFileUploader.single("project_profile"), ProjectController.UpdateProject)

module.exports = projectRouter;
