const authRouter = require("./auth.router");
const projectRouter = require("./project.router");
const teamRouter = require("./team.router");
const userRouter = require("./user.router");

const router = require("express").Router();

router.get('/auth', authRouter)
router.get('/project', projectRouter)
router.get('/user', userRouter)
router.get('/team', teamRouter)


module.exports = {
    Routes: router,
}