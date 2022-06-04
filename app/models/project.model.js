const { Schema, model, default: mongoose } = require("mongoose")

const projectSchema = new Schema({
    title: { type: String, required: true },
    text: { type: String },
    image: { type: String, default: "/defualts/default.png" },
    owner: { type: mongoose.Types.ObjectId, required: true },
    team: { type: mongoose.Types.ObjectId },
    Private: { type: Boolean, default: true, required: true }
}, { timestamps: true })
const projectModel = model("projects", projectSchema);

module.exports = { projectModel }
