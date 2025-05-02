const mongoose = require('mongoose');

const formTwoSchema = new mongoose.Schema({
    resumeURL: {
        type: String,
        required: true,
    },
    whatsNotInResume: {
        type: String,
        required: true,
    },
    whatDoYouWantToBe: {
        type: String,
        required: true,
    },
    approachTowardsIt: {
        type: String,
        required: true,
    },
    randomInteger: {
        type: Number,
        default: () => Math.floor(Date.now() / 1000) + Math.floor(Math.random() * 1000),
    },
}, { timestamps: true });

module.exports = mongoose.model('FormTwo', formTwoSchema);