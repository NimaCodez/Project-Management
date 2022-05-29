const { Schema, model } = require("mongoose")

const userSchema = new Schema({
    firstName: { type: String, required: false },
    lastName: { type: String, required: false },
    mobile: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true, },
    email: { type: String, required: true, unique: true },
    skills: { type: Array, required: false, default: [] },
    teams: { type: Array, required: false, default: [] },
    roles: { type: Array, required: true, default: ["USER"] }
}, {timestamps: true})

const UserModel = model("User", userSchema);

module.exports = {
    UserModel,
}