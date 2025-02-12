import mongoose from "mongoose";
import { Schema } from "mongoose";

const messageSchema = new Schema({
    senderId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    recieverId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        require: true
    },
    text: {
        type: String
    },
    media: {
        type: String
    }
}, {
    timestamps: true
});

const MessageModel = mongoose.model("message", messageSchema);

export default MessageModel;