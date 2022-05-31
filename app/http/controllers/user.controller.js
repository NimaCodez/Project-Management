class UserController {
    GetProfile(req, res, next) {
        try {
            const user = req.user;
            return res.status(200).json({
                status: 200, success: true, user
            })
        } catch (error) {
            next(error);
        }
    }
    EditProfile() {

    }
    AddSkills() {

    }
    EditSkills() {

    }
    AcceptInviteToTeam() {

    }
    RejectInviteToTeam() {

    }
}

module.exports = {
    UserController: new UserController()
}