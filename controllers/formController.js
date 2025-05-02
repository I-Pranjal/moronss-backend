const express = require('express');
const FormOne = require('../models/formOne'); // Adjust the path as needed
const FormTwo = require('../models/formTwo'); // Adjust the path as needed

// @desc    Handle submission of Form One
// @route   POST /api/forms/formone
const submitFormOne = async (req, res) => {
    try {
        const formOneData = req.body;
        // Basic validation
        if (!formOneData) {
            return res.status(400).json({ message: 'Form One data is required' });
        }

        // Save formOneData to the database
        const newFormOne = new FormOne(formOneData);
        await newFormOne.save();

        res.status(200).json({ message: 'Form One submitted successfully', data: newFormOne.randomInteger });
    } catch (error) {
        console.error('Error handling Form One:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Handle submission of Form Two
// @route   POST /api/forms/formtwo
const submitFormTwo = async (req, res) => {
    try {
        const formTwoData = req.body;

        // Basic validation
        if (!formTwoData) {
            return res.status(400).json({ message: 'Form Two data is required' });
        }

        // Save formTwoData to the database
        const newFormTwo = new FormTwo(formTwoData);
        await newFormTwo.save();

        res.status(200).json({ message: 'Form Two submitted successfully', data: newFormTwo.randomInteger });
    } catch (error) {
        console.error('Error handling Form Two:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    submitFormOne,
    submitFormTwo,
};