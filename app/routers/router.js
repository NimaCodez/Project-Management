const authRouter = require("./auth.router");
const projectRouter = require("./project.router");
const teamRouter = require("./team.router");
const userRouter = require("./user.router");

const router = require("express").Router();

router.use('/auth', authRouter)
router.use('/project', projectRouter)
router.use('/user', userRouter)
router.use('/team', teamRouter)


module.exports = {
    Routes: router,
}