const { Schema, model } = require("mongoose");

module.exports = model("prefix", new Schema({
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