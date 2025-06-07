const express = require('express');
const router = express.Router();
const { postResume, generateContent } = require('../controllers/resumeController');

// Route to handle resume data submission
router.post('/', postResume);
router.post('/generate-content', generateContent); 

// Export the router
module.exports = router;