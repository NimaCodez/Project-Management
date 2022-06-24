const { UserModel } = require("../../models/user.model");
const path = require("path")
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
            const data = { ...req.body };
            const userId = req.user._id;
            let fields = ["firstName", "lastName", "skills"]
            let badValues = ["", " ", ".", null, undefined, 0, -1];
            Object.entries(data).forEach(([key, value]) => {
                if (!fields.includes(key)) delete data[key]
                if (badValues.includes(value)) delete data[key]
            })
            const result = await UserModel.updateOne({ _id: userId }, { $set: data })
            if (result.modifiedCount > 0) return res.status(200).json({ status: 200, success: true, message: "Profile Was Updated Successfully 🎉✨" })
            throw { status: 400, success: false, message: "Profile Was Not Updated 🥲" }
        } catch (error) {
            next(error);
        }
    }
    async UploadProfile(req, res, next) {
        try {
            const userId = req.user._id;
            const pathPrefix = path.join(__dirname, "..", "..", "..");
            let image;
            if (!req.file) {
                throw { status: 400, success: false, message: "Please Choose A File" }
            }
            else {
                image = req.file.path.substring(pathPrefix.length).split("\\public")[1].replace(/[\\]/gi, "/");
            }
            const result = await UserModel.updateOne({ _id: userId }, { $set: { profileUrl: image } })
            if (result.modifiedCount <= 0) {
                throw { status: 400, success: false, message: "Nothing Changed In Database" }
            }
            return res.json({
                status: 200,
                success: true,
                imageUrl: `${req.protocol}://${req.get("host")}${image}`
            })
        } catch (error) {
            next(error)
        }
    }
    async GetInviteRequests(req, res, next) {
        try {
            const userID = req.user._id;
            const { inviteRequests } = await UserModel.findOne({ _id: userID }, { inviteRequests: 1})
            return res.status(200).json({
                status: 200,
                success: true,
                requests: inviteRequests ? inviteRequests : []
            })
        } catch (error) {
            next(error)
        }
    }
    async GetRequestsByStatus(req, res, next) {
        try {
            const { status } = req.params;
            const userID = req.user._id;
            const requests = await UserModel.aggregate([
                {
                    $match: { _id : userID },
                },
                {
                    $project: {
                        inviteRequests: 1,
                        _id: 0,
                        inviteRequests: {
                            $filter: {
                                input: "$inviteRequests",
                                as: "request",
                                cond: {
                                    $eq: [ "$$request.status", status ]
                                }
                            }
                        }
                    }
                },
            ]);
            return res.status(200).json({
                status: 200,
                success: true,
                requests: requests?.[0]?.inviteRequests || []
            })
        } catch (error) {
            next(error)
        }
    }
    async ChangeRequestStatus(req, res, next) {
        try {
            const { id, status } = req.params;
            const inviteRequest = await UserModel.findOne({ "inviteRequests._id":  id })
            if (!inviteRequest) throw {
                status: 400,
                success: false,
                message: "No Request with the sent Id was found! 🗿"
            }
            const request = inviteRequest.inviteRequests.find(item => item.id == id)
            if (request.status !== "pending") throw {
                status: 400,
                success: false,
                message: "this invitation has already been rejected or accepted! ✅"
            }
            if (!["accepted", "rejected"].includes(status)) throw {
                status: 400,
                success: false,
                message: "Sent Data is not correct! 🐢"
            }
            const updateResult = await UserModel.updateOne({
                "inviteRequest._id": id,
                $set: { "inviteRequests.$.status": status }
            })
            if (updateResult.modifiedCount == 0) throw {
                status: 500,
                success: false,
                message: "Unfortunately Request's Status wasn't changed! 🥲"
            }
            return res.status(200).json({
                status: 200,
                success: true,
                message: "Request status was changed successfully! ✨🎉"
            })
        } catch (error) {
            next(error)
        }
    }
    AddSkills() {
        const { skills } = req.body;

    }
    EditSkills() {
        
    }
    RejectInviteToTeam() {

    }
}

module.exports = {
    UserController: new UserController()
}