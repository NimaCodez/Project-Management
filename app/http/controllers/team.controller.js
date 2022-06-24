const autoBind = require("auto-bind");
const { teamModel } = require("../../models/team.model");
const { UserModel } = require("../../models/user.model");

class TeamController {
    constructor(){
        autoBind(this)
    }
    async findTeam(owner, teamid) {
        const team = await teamModel.findOne({ owner, _id: teamid });
        if(!team) throw {status: 404, success: false, message: "Team not found."};
        return team;
    }
    async checkUsernameExistence(username) {
        const findResult = await teamModel.findOne({ username: username });
        if(!findResult) return true
        throw { status: 400, success: false, message: "Username is already taken" }
    }
    async FindUserInTeam(teamid, userID) {
        const result = await teamModel.findOne({
            $or: [
                { owner: userID },
                { users: userID }
            ],
            _id: teamid
        })
        return !!result;
    }
    async CreateTeam(req, res, next) {
        try {
            const owner = req.user._id;
            const { name, description, username } = req.body;
            await this.checkUsernameExistence(username);
            const createResult = await teamModel.create({
                name,
                description,
                username,
                owner
            })
            if (!createResult) throw {status: 500, success: false, message: "Sorry, Team Was not created 🥲"}
            return res.status(201).json({
                status: 201, 
                success: true,
                message: `${createResult.name} was created successfully 🎉`
            })
        } catch (error) {
            next(error);
        }
    }
    async RemoveTeamById(req, res, next) {
        try {
            const teamid = req.params.id;
            const owner = req.user._id;
            const team = await teamModel.findOne({owner, _id: teamid})
            if (!team) throw { status: 400, success: false, message: `There is no team which ${req.user.username} is the owner with id ${teamid}` }
            const deleteResult = await teamModel.deleteOne({ owner, _id: teamid })
            if(deleteResult.deletedCount == 0) throw { status: 500, success: false, message: "Team Was ot Deleted, Try again Later😬" }
            return res.status(200).json({
                status: 200,
                success: true,
                message: "Team deleted successfully 🎉"
            })
        } catch (error) {
            next(error);
        }
    }
    async UpdateTeam(req, res, next) {
        try {
            const owner = req.user._id;
            const teamid = req.params.id;
            const data = {...req.body};
            await this.checkUsernameExistence(data.username)
            const team = await this.findTeam(owner, teamid);
            Object.entries(data).forEach(([key, value]) => {
                if(!["name", "username", "description"].includes(key)) delete data[key]
                if(["", " ", "  ", ".", null, undefined, NaN, 0, -1,, /[^<>$]/gim].includes(value)) delete data[key]
            })
            const result = await teamModel.updateOne({ owner, _id: teamid }, { $set: data})
            if (result.modifiedCount > 0) return res.status(200).json(
            { 
                status: 200,
                success: true,
                message: "Profile Was Updated Successfully ✨🎉"
            })
        } catch (error) {
            next(error);
        }
    }
    async GetAllTeams(req, res, next) {
        try {
            const teams = await teamModel.find({})
            return res.json({
                status: 200,
                success: true,
                teams
            })
        } catch (error) {
            next(error);
        }
    }
    async GetMyTeams(req, res, next) {
        try {
            const userID = req.user._id;
            const teams = await teamModel.aggregate([
                {
                    $match: {
                        $or: [
                            { owner: userID },
                            { users: userID }
                        ]
                    },
                },
                {
                    $lookup: {
                        localField: "owner",
                        foreignField: "_id",
                        from: "users",
                        as: "owner"
                    },
                },
                {
                    $project: {
                        "owner.username": 1,
                        "owner.mobile": 1,
                        "owner.email": 1
                    },
                },
                {
                    $unwind: "$owner"
                }
            ])
            if(!teams) throw { status: 400, success: false, message: `No team(s) was found for user ${req.user.username}` }
            return res.status(200).json({
                status: 200,
                success: true,
                teams
            })
        } catch (error) {
            next(error);
        }
    }
    async GetTeamById(req, res, next) {
        try {
            const owner = req.user._id;
            const teamid = req.params.id;
            const team = await teamModel.findOne({ owner, _id: teamid })
            if(!team) throw { status: 400, success: false, message: "No team Was Found 🥲" }
            return res.status(200).json({
                status: 200,
                success: true,
                team
            })
        } catch (error) {
            next(error)
        }
    }
    async InviteUserToTeam(req, res, next) {
        try {
            const userID = req.user._id;
            const { teamid, username } = req.params;
            const team = await this.FindUserInTeam(teamid, userID)
            if (!team) throw { status: 400, success: false, message: "Team Not Found 🐢" }
            const user = await UserModel.findOne({username})
            if (!user) throw { status: 400, success: false, message: "The user you requested to invite was not found! 🗿" }
            const userInvited = await this.FindUserInTeam(teamid, user._id);
            if(userInvited) throw { status: 400, success: false, message: "User has been invited before !" }
            const request = {
                teamid,
                caller: req.user.username,
                requestDate: new Date,
                status: "Pending"
            }
            const InviteRequestUpdateResult = await UserModel.updateOne({ username }, {
                $push: { inviteRequests: request }
            })
            if (InviteRequestUpdateResult.modifiedCount == 0) throw { status: 500, success: false, message: "Invite request wasn't been sent. 🥲" }
            return res.status(201).json({
                status: 201,
                success: true,
                message: "Invite Request Was Successfully Been Sent ✨🎉"
            })
        } catch (error) {
            next(error)
        }
    }

    GetProjects() {

    }

    GetProjectsById() {

    }
        
}

module.exports = {
    TeamController: new TeamController()
}