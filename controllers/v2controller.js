const axios = require('axios');
const { getDetails, extractJDContent } = require('../utils/v2functions');
const { build_LinkedIn_analyser_prompt, job_role_comparison_prompt, suggest_project_prompt, generateAIInsights } = require('../utils/buildPrompt');
const { getGeminiResponse } = require('../utils/generateGeminiResponse');
const analysePortfolio = require('../utils/analyseWebsite').analysePortfolio;

const generateProfileAnalysis = async (req, res) => {
    console.log('Received request to generate profile analysis');
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

const compareJobs = async (req, res) => {
    try {
        const jd1Text = await extractJDContent(req.body.jd1Text, req.files?.jd1File?.[0]);
        const jd2Text = await extractJDContent(req.body.jd2Text, req.files?.jd2File?.[0]);

        if (!jd1Text || !jd2Text)
            return res.status(400).json({ error: "Both job roles must be provided" });

        const prompt = job_role_comparison_prompt(jd1Text, jd2Text);

        const aiResponse = await getGeminiResponse(prompt);
        const rawText = aiResponse?.candidates?.[0]?.content?.parts?.[0]?.text || '';
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
    } catch (err) {
        console.error("Comparison error:", err);
        res.status(500).json({ error: "Failed to generate comparison" });
    }
};

const suggest_project = async (req, res) => {
    const { domain, techStack, level } = req.body;

    const prompt = suggest_project_prompt(domain, techStack, level);

    try {
        const ideas = await getGeminiResponse(prompt);
        const rawText = ideas?.candidates?.[0]?.content?.parts?.[0]?.text || '';
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
    } catch (e) {
        res.status(500).json({ error: "Failed to generate project ideas." });
    }
};

const analyse_Portfolio = async (req, res) => {
  const { url, targetRole } = req.body;

  if (!url || !targetRole) {
    return res.status(400).json({ error: 'URL and targetRole are required.' });
  }

   const siteData = await analysePortfolio(url);
   const prompt = generateAIInsights(siteData, targetRole);
   const aiResponse = await getGeminiResponse(prompt);
    const rawText = aiResponse?.candidates?.[0]?.content?.parts?.[0]?.text || '';
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
  
};




module.exports = {
    generateProfileAnalysis,
    compareJobs,
    suggest_project,
    analyse_Portfolio
};