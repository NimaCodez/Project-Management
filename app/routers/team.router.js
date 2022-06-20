const { TeamController } = require("../http/controllers/team.controller");
const { checkLogin } = require("../http/middlewares/checkLogin");
const { validationErrorMapper } = require("../http/middlewares/functions");
const { mongoIdValidator } = require("../http/validations/public");
const { createTeamValidator } = require("../http/validations/team.validations");

const teamRouter = require("express").Router();

teamRouter.get("/", checkLogin, TeamController.GetAllTeams)

teamRouter.get("/myteams", checkLogin, TeamController.GetMyTeams)

teamRouter.get("/t/:id", checkLogin, TeamController.GetTeamById)

teamRouter.get("/projets", checkLogin, TeamController.GetProjects)

teamRouter.get("/projets/:id", checkLogin, TeamController.GetProjectsById)

teamRouter.post("/new", checkLogin, createTeamValidator(), validationErrorMapper, TeamController.CreateTeam)

teamRouter.patch("/edit/:id", checkLogin, mongoIdValidator(), validationErrorMapper, TeamController.UpdateTeam)

teamRouter.delete("/remove/:id", checkLogin, mongoIdValidator(), validationErrorMapper, TeamController.RemoveTeamById)

module.exports = teamRouter
