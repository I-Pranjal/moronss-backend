const axios = require('axios');
const { getDetails } = require('../utils/v2functions');
const { build_LinkedIn_analyser_prompt } = require('../utils/buildPrompt');

const generateProfileAnalysis = async (req, res) => {
    const { profileURL } = req.body;

    if (!profileURL) {
        return res.status(400).json({ error: 'Profile URL is required' });
    }

    try {
        const profileData = await getDetails(profileURL);
        const prompt = build_LinkedIn_analyser_prompt(profileData);

        // Call Gemini API
        const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

        const requestBody = {
            contents: [
                {
                    parts: [
                        {
                            text: prompt,
                        },
                    ],
                },
            ],
        };

        const geminiResponse = await axios.post(url, requestBody, {
            headers: { 'Content-Type': 'application/json' },
        });

        const rawText = geminiResponse.data.candidates?.[0]?.content?.parts?.[0]?.text || '';
        let parsed = {};
        try {
            // Remove code block markers and trim whitespace
            const cleaned = rawText.replace(/```json|```/g, '').trim();
            parsed = JSON.parse(cleaned);
            return res.status(200).json(parsed);
        } catch (err) {
            console.error('Error parsing Gemini response:', err.message);
            // Fallback: return raw text if parsing fails
            return res.status(200).json({ raw: rawText });
        }
    } catch (error) {
        console.error('Error in generateProfileAnalysis:', error.message);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    generateProfileAnalysis
};