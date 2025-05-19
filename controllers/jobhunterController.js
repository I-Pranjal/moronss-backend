const axios = require('axios');

// get response for the job hunter using gemini
const getjobHunterResponse = async (req, res) => {
    try {
        const { userMessage } = req.body;

        if (!userMessage) {
            return res.status(400).json({ error: "userMessage is required" });
        }

        const GEMINI_API_KEY = process.env.GEMINI_API_KEY; // Replace with your actual API key
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

        const requestBody = {
            contents: [
            {
                parts: [
                {
                    text: `Answer like an AI model for job hunting.The user is looking for job/intern Answer in a word limit of 100 words : ${userMessage}`
                }
                ]
            }
            ]
        };

        const response = await axios.post(url, requestBody, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        return res.status(200).json(response.data);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "An error occurred while processing your request" });
    }
};

module.exports = { getjobHunterResponse };