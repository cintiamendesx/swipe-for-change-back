const { Schema, model, Types } = require("mongoose");

const MessageSchema = new Schema({
    authorId: { type: Types.ObjectId, ref: "User" },
    recipientId: { type: Types.ObjectId, ref: "User" },

    text: [
        String
        // required: true
    ],
},{
    timestamps: true
})

const MessageModel = model("Message", MessageSchema);

module.exports = MessageModel;
