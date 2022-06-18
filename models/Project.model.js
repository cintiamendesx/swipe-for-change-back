const { Schema, model, Types } = require("mongoose");

const ProjectSchema = new Schema({
    ownerId: { type: Types.ObjectId, ref: "User" },
    name: {
        type: String,
        required: true
    },
    adress: {
        type: String,
        required: true
    },
    bio: String,
    avatar: {
        type: String,
        required: true
    },
    skillsRequired: [{
        type: String,
        required: true
    }],
})

const ProjectModel = model("Project", ProjectSchema);

module.exports = ProjectModel;
