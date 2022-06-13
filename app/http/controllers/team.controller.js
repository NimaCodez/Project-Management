const { teamModel } = require("../../models/team.model");

class TeamController {
    async CreateTeam(req, res, next) {
        try {
            const owner = req.user._id;
            const { name } = req.body;
            const createResult = await teamModel.create({
                name,
                owner
            })
            if (!createResult.acknowledged) throw {status: 500, success: false, message: "team Was not created"}
            return res.status(201).json({
                status: 201, 
                success: true,
                message: `${createResult.name} was created successfully`
            })
        } catch (error) {
            next(error);
        }
    }

    InviteUserToTeam(){

    }
    
    RemoveTeamById() {

    }
    
    UpdateTeam(){

    }
    
    // GetProjects(){}
    // GetProjectsById() {}
}

module.exports = {
    TeamController: new TeamController()
}