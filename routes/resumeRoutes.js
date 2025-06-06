const express = require('express');
const router = express.Router();
const { postResume } = require('../controllers/resumeController');

// Route to handle resume data submission
router.post('/', postResume);

// Export the router
module.exports = router;