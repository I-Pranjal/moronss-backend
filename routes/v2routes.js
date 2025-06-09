const express = require('express');
const router = express.Router();
const { generateProfileAnalysis , compareJobs, suggest_project} = require('../controllers/v2controller');
const multer = require("multer");
const pdfParse = require("pdf-parse");
const upload = multer();


// Route to handle profile analysis
router.post('/profile-analysis', generateProfileAnalysis);
router.post("/compare-jds", upload.fields([{ name: 'jd1File' }, { name: 'jd2File' }]), compareJobs ) ; 
router.post("/suggestproject" , suggest_project); 

// Export the router
module.exports = router;