const autoBind = require("auto-bind");
const { teamModel } = require("../../models/team.model");

class TeamController {
    constructor(){
        autoBind(this)
    }
    async findTeam(owner, teamId) {
        const team = await teamModel.findOne({ owner, _id: teamId });
        if(!team) throw {status: 404, success: false, message: "Team not found."};
        return team;
    }
    async checkUsernameExistance(username) {
        const findResult = await teamModel.findOne({ username: username });
        if(!findResult) return true
        throw { status: 400, success: false, message: "Username is already taken" }
    }
    async CreateTeam(req, res, next) {
        try {
            const owner = req.user._id;
            const { name, description, username } = req.body;
            await this.checkUsernameExistance(username);
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
            const teamId = req.params.id;
            const owner = req.user._id;
            const team = await teamModel.findOne({owner, _id: teamId})
            if (!team) throw { status: 400, success: false, message: `There is no team wich ${req.user.username} is the owner with id ${teamId}` }
            const deleteRsult = await teamModel.deleteOne({ owner, _id: teamId })
            if(deleteRsult.deletedCount == 0) throw { status: 500, success: false, message: "Team Was ot Deleted, Try again Later😬" }
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
            const teamId = req.params.id;
            const data = {...req.body};
            await this.checkUsernameExistance(data.username)
            const team = await this.findTeam(owner, teamId);
            Object.entries(data).forEach(([key, value]) => {
                if(!["name", "username", "description"].includes(key)) delete data[key]
                if(["", " ", "  ", ".", null, undefined, NaN, 0, -1,, /[^<>$]/gim].includes(value)) delete data[key]
            })
            const result = await teamModel.updateOne({ owner, _id: teamId }, { $set: data})
            if (result.modifiedCount > 0) return res.status(200).json(
            { 
                status: 200,
                success: true,
                message: "Profile Was Updated Successfuly"
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
            const teams = await teamModel.find({
                $or: [
                    { owner: userID },
                    { users: userID }
                ]
            })
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
            const teamId = req.params.id;
            const team = await teamModel.findOne({ owner, _id: teamId })
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
    InviteUserToTeam() {

    }

    GetProjects() {

    }

    GetProjectsById() {

    }
        
}

module.exports = {
    TeamController: new TeamController()
}