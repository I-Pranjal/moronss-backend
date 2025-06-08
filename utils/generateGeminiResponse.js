const axios = require('axios');

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

/**
 * Calls Gemini API with a user message and returns the response.
 * @param {string} userMessage - The message to send to Gemini.
 * @returns {Promise<Object>} - The Gemini API response data.
 */
async function getGeminiResponse(prompt) {
    try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

        const requestBody = {
            contents: [
                {
                    parts: [
                        {
                            text: prompt
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

        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error("An error occurred while processing your request");
    }
}

module.exports = { getGeminiResponse };