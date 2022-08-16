import { Schema, model } from "mongoose";

export default model("prefix", new Schema({
    guildId: {
        type: String,
        required: true
    },
    prefix: {
        type: String,
        required: true
    },
    oldPrefix: {
        type: String,
        required: true
    }
}));