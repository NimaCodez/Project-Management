const authRouter = require("express").Router();
const {registerValidator, loginValidator} = require("../../app/http/validations/auth.validations");
const { AuthController } = require("../http/controllers/auth.controller");
const { validationErrorMapper } = require("../http/middlewares/functions");

authRouter.post('/register', registerValidator(), validationErrorMapper, AuthController.Register);
authRouter.post('/login', loginValidator(), AuthController.Login);

module.exports = authRouter;
