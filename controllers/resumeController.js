const ResumeMaker = require('../models/resumeMaker');
const express = require('express');
const multer = require('multer');
const pdfParse = require('pdf-parse');
const mammoth = require('mammoth');
const axios = require('axios');
const router = express.Router();
const {buildPrompt} = require('../utils/buildPrompt');

const upload = multer({ storage: multer.memoryStorage() });

const generateContent =  async (req, res) => {
  try {
    const { jd } = req.body;
    const resumeFile = req.file;

    if (!jd) {
      return res.status(400).json({ error: 'Job description is required.' });
    }

    let resumeText = '';
    if (resumeFile) {
      const mimetype = resumeFile.mimetype;
      if (mimetype === 'application/pdf') {
        const data = await pdfParse(resumeFile.buffer);
        resumeText = data.text;
      } else if (
        mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      ) {
        const result = await mammoth.extractRawText({ buffer: resumeFile.buffer });
        resumeText = result.value;
      }
    }

    // Combine prompt
    const prompt = buildPrompt(jd, resumeText);

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

// Extract JSON content from inside the ```json code block
const jsonMatch = rawText.match(/```json\s*([\s\S]*?)\s*```/);

if (jsonMatch && jsonMatch[1]) {
  try {
    const parsedJson = JSON.parse(jsonMatch[1]);
    return res.status(200).json(parsedJson);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to parse JSON from Gemini response' });
  }
} else {
  return res.status(500).json({ error: 'No valid JSON block found in Gemini response' });
}

  }
  catch (err) {
    console.error('Gemini error:', err.message);
    return res.status(500).json({ error: 'An error occurred while generating content.' });
  }
}





function extractSection(text, title) {
  const regex = new RegExp(`${title}[:\\n]+([\\s\\S]*?)(?=\\n[A-Z]|$)`, 'i');
  const match = text.match(regex);
  return match ? match[1].trim() : 'Section not found.';
}





// Helper function to merge arrays without duplicates
function mergeArrays(arr1 = [], arr2 = []) {
  return Array.from(new Set([...(arr1 || []), ...(arr2 || [])]));
}

// POST resume data
const postResume = async (req, res) => {
  try {
    const data = req.body;
    const { fullName, phone } = data.personalInfo;

    // Check for existing resume by name and phone
    let existingResume = await ResumeMaker.findOne({
      'personalInfo.fullName': fullName,
      'personalInfo.phone': phone,
    });

    if (existingResume) {
      // Merge details and increment useCount
      existingResume.personalInfo = { ...existingResume.personalInfo, ...data.personalInfo };

      // Merge skills
      for (const key in data.skills) {
        existingResume.skills[key] = mergeArrays(existingResume.skills[key], data.skills[key]);
      }

      // Merge education, experience, projects, honors, certifications
      existingResume.education = mergeArrays(existingResume.education, data.education);
      existingResume.experience = mergeArrays(existingResume.experience, data.experience);
      existingResume.projects = mergeArrays(existingResume.projects, data.projects);
      existingResume.honors = mergeArrays(existingResume.honors, data.honors);
      existingResume.certifications = mergeArrays(existingResume.certifications, data.certifications);

      existingResume.useCount += 1;
      await existingResume.save();
      return res.status(200).json({ message: 'Resume merged and updated', resume: existingResume });
    } else {
      // Create new resume
      const newResume = new ResumeMaker(data);
      await newResume.save();
      return res.status(201).json({ message: 'Resume created', resume: newResume });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};







module.exports = {
  postResume,
  generateContent,
};
