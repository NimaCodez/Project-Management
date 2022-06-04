const path = require("path");
const { projectModel } = require("../../models/project.model");

class ProjectController {
    async CreateProject(req, res, next) {
        try {
            const {title, text} = req.body;
            const owner = req.user._id;
            const result = await projectModel.create({title, text, owner})
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
    GetAllProjects() {

    }
    GetProjectsById() {

    }
    GetAllProjectsOfTeam() {

    }
    // getProjectOfUser
    GetUserProjects() {

    }
    async UpdateProject(req, res, next) {
        try {
            let owner = req.user._id;
            const data = {...req.body};
            const project = await projectModel.findOne({ owner: owner })
            if(!project) throw {status: 400, success: false, message: "Project was not found!!"}
            const result = await projectModel.updateOne({ owner: owner }, { $set: data })
            const pathPrefix = path.join(__dirname, "..", "..", "..");
            let image = req.file.path.substring(pathPrefix.length).split("\\public")[1].replace(/[\\]/gi, "/");
            console.log(`${req.protocol}://${req.get("host")}${image}`);
            if (result.modifiedCount > 0) return res.status(200).json({ status: 200, success: true, message: "Profile Was Updated Successfuly", profile: `${req.protocol}://${req.get("host")}${image}` })
            throw { status: 400, success: false, message: "Profile Was Not Updated" }
        } catch (error) {
            next(error)
        }
    }
    RemoveProject() {

    }
}

module.exports = {
    ProjectController: new ProjectController()
}