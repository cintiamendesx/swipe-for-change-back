const { Schema, model, Types } = require("mongoose");

const UserSchema = new Schema({
    userType: {
            type: String,
            enum: ["Volunteer", "Entity"],
            required: true,
          },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    adress: {
        type: String,
        required: true
    },
    bio: {
        type: String
    },
    avatar: {
        type: String,
        required: true
    },
    skills: {
        type: String,
        required: true
    },
    passwordHash: {
        type: String,
        required: true
    },
})

const UserModel = model("User", UserSchema);

module.exports = UserModel;

