const { Schema, model, Types } = require("mongoose");

const MessageSchema = new Schema({
    authorId: { type: Types.ObjectId, ref: "User" },
    recipientId: { type: Types.ObjectId, ref: "User" },
    name: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
},{
    timestamps: true
})

const MessageModel = model("Message", MessageSchema);

module.exports = MessageModel;
