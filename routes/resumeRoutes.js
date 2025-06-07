const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });
const { postResume, generateContent } = require('../controllers/resumeController');

// Route to handle resume data submission
router.post('/', postResume);
router.post('/generate-content', upload.single('resume'), generateContent);

// Export the router
module.exports = router;