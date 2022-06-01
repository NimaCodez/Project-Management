const { UserModel } = require("../../models/user.model");

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
    async EditProfile(req, res, next) {
        try {
            const data = {...req.body};
            const userId = req.user._id;
            let fields = ["firstName", "lastName", "skills"]
            let badValues = ["", " ", ".", null, undefined, 0, -1];
            Object.entries(data).forEach(([key, value]) => {
                if (!fields.includes(key)) delete data[key]
                if (badValues.includes(value)) delete data[key]
            })
            console.log(data);
            const result = await UserModel.updateOne({_id: userId}, {$set: data})
            if(result.modifiedCount > 0) return res.status(200).json({status:200, success: true, message: "Profile Was Updated Successfuly"})
            throw {status: 400, success: false, message: "Profile Was Not Updated"}
        } catch (error) {
            next(error);
        }
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