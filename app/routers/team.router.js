const { TeamController } = require("../http/controllers/team.controller");
const { checkLogin } = require("../http/middlewares/checkLogin");

const teamRouter = require("express").Router();

teamRouter.post("/new", checkLogin, TeamController.CreateTeam)

module.exports = teamRouter