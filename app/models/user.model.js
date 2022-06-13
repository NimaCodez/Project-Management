const { Schema, model, Types } = require("mongoose")

const userSchema = new Schema({
    firstName: { type: String, required: false },
    lastName: { type: String, required: false },
    mobile: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true, },
    email: { type: String, required: true, unique: true },
    skills: { type: [String], required: false, default: [] },
    profileUrl: { type: String, required: false, default: "uplodes/defualts/user_default.png"},
    teams: { type: [Types.ObjectId], required: false, default: [] },
    token: { type: String },
    roles: { type: Array, required: true, default: ["USER"] }
}, {timestamps: true})

const UserModel = model("User", userSchema);

module.exports = {
    UserModel,
}