import moongose from "mongoose";

const messageSchema = new moongose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    origin: {
        type: String,
        enum: ['Resilio B2C SAAS APP', 'Resilio Marketing'],
        required: true
    }
}, { timestamps: true });

const Message = moongose.model("Message", messageSchema);
export default Message;