const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please add a name'],
        },
        profilePictureUrl: {
            type: String,
            required: false,
        },
        email: {
            type: String,
            required: [true, 'Please add an email'],
            unique: true,
        },
        contactNo: {
            type: String,
            required: [false, 'Please add a contact number'],
        },
        randomInteger: {
            type: Number,
            default: () => Math.floor(Date.now() / 1000) + Math.floor(Math.random() * 1000),
        },
        password: {
            type: String,
            required: [true, 'Please add a password'],
            default: () => Math.floor(Date.now() / 1000) + Math.floor(Math.random() * 1000),
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('User', userSchema);
