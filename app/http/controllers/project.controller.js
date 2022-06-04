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
    UpdateProject() {

    }
    RemoveProject() {

    }
}

module.exports = {
    ProjectController: new ProjectController()
}