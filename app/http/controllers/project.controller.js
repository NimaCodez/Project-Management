const autoBind = require("auto-bind");
const { isValidObjectId, isObjectIdOrHexString, default: mongoose } = require("mongoose");
const path = require("path");
const { projectModel } = require("../../models/project.model");

class ProjectController {
    constructor() {
        autoBind(this)
    }
    async CreateProject(req, res, next) {
        try {
            const {title, text, tags} = req.body;
            const owner = req.user._id;
            const result = await projectModel.create({title, text, owner, tags})
            if(!result) throw {status: 400, success: false, message: "Project Was not created"}
            return res.status(201).json({
                status: 201, 
                success: true,
                message: `${title} created successfully. Owner: -${owner}`
            })
        } catch (error) {
            next(error);
        }
    }
    async GetAllProjects(req, res, next) {
        try {
            const owner = req.user._id;
            const projects = await projectModel.find({owner}, {_id: 0, __v: 0, owner: 0})
            const {title, tags, text, image} = projects;
            return res.status(200).json({
                status: 200,
                success: true,
                projects,
                title, tags, text, image
            })
        } catch (error) {
            next(error);
        }
    }
    async findProject(projectId, owner) {
        if(!isValidObjectId(projectId)) throw {status: 404, success: false, message: "Id Not Valid"};
        const project = await projectModel.findOne({owner, _id: projectId}, {__v: 0, _id: 0});
        if (!project) throw {status: 400, success: false, message: "Project Not Found"}
        return project;
    }
    async GetProjectsById(req, res, next) {
        try {
            const owner = req.user._id;
            const projectId = req.params.id;
            const project = await this.findProject(projectId, owner)
            if (!project) throw { status: 404, success: false, message: "Project Was not found"}
            return res.status(200).json({
                status: 200,
                success: true,
                project
            })
        } catch (error) {
            next(error)
        }
    }
    async UpdateProjectProfile(req, res, next) {
        try {
            const owner = req.user._id;
            const projectId = req.params.id;
            const data = {...req.body};
            const project = await projectModel.findOne({ owner, _id: projectId })
            if(!project) throw {status: 400, success: false, message: "Project was not found!!"}
            const pathPrefix = path.join(__dirname, "..", "..", "..");
            let image = req.file.path.substring(pathPrefix.length).split("\\public")[1].replace(/[\\]/gi, "/");
            project.image = `${req.protocol}://${req.get("host")}${image}`
            project.save()
            const result = await projectModel.updateOne({ owner: owner, _id: projectId }, { $set: data })
            console.log(`${req.protocol}://${req.get("host")}${image}`);
            if (result.modifiedCount > 0) return res.status(200).json({ status: 200, success: true, message: "Profile Was Updated Successfuly", profile: `${req.protocol}://${req.get("host")}${image}` })
            throw { status: 400, success: false, message: "Profile Was Not Updated" }
        } catch (error) {
            next(error)
        }
    }
    async UpdateProject(req, res, next) {
        try {
            const owner = req.user._id;
            const projectId = req.params.id;
            const data = {...req.body};
            const project = await projectModel.findOne({ owner, _id: projectId })
            if(!project) throw {status: 400, success: false, message: "Project was not found!!"}
            const result = await projectModel.updateOne({ owner: owner, _id: projectId }, { $set: data })
            if (result.modifiedCount > 0) return res.status(200).json({ status: 200, success: true, message: "Profile Was Updated Successfuly", profile: `${req.protocol}://${req.get("host")}${image}` })
            throw { status: 400, success: false, message: "Profile Was Not Updated" }
        } catch (error) {
            next(error)
        }
    }
    async RemoveProject(req, res, next) {
        try {
            const owner = req.user._id;
            const projectId = req.params.id;
            const deleteResult = await projectModel.deleteOne({ owner, _id: projectId })
            if (!deleteResult.deletedCount == 0) throw {status: 500, success: false, message: "Project was not deleted, Try again"}
            return res.status(200).json({
                status: 200,
                success: true,
                message: "projet deleted successfully!"
            })
        } catch (error) {
            next(error)
        }
    }

    GetAllProjectsOfTeam(req, res, next) {
        try {
            
        } catch (error) {
            next(error)
        }
    }

}

module.exports = {
    ProjectController: new ProjectController()
}