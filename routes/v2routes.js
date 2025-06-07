const express = require('express');
const router = express.Router();
const { generateProfileAnalysis } = require('../controllers/v2controller');

// Route to handle profile analysis
router.post('/profile-analysis', generateProfileAnalysis);


// Export the router
module.exports = router;