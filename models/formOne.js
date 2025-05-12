const mongoose = require('mongoose');

const formOneSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    mobileNo: {
        type: String,
        required: true,
        trim: true
    },
    collegeName: {
        type: String,
        required: true,
        trim: true
    },
    graduationYear: {
        type: Number,
        required: true
    },
    randomInteger: {
        type: Number,
        required: true,
        // default: () => Math.floor(Date.now() / 1000) + Math.floor(Math.random() * 1000),
    }
});

const FormOne = mongoose.model('FormOne', formOneSchema);

module.exports = FormOne;