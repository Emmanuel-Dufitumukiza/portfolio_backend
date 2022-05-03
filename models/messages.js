const mongoose = require("mongoose");
const Joi = require('joi');

const messageSchema = new mongoose.Schema({
    names: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    }
},{
    timestamps: true,
})

module.exports = mongoose.model("message", messageSchema);