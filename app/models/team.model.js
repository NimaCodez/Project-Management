const { Schema, model, default: mongoose } = require("mongoose")

const teamSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String},
    users: { type: [mongoose.Types.ObjectId], default: []},
    owner: { type: mongoose.Types.ObjectId, required: true }
}, {timestamps: true})
const teamModel = model("teams", teamSchema);

module.exports = { teamModel }