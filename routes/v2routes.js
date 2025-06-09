const express = require('express');
const router = express.Router();
const { generateProfileAnalysis , compareJobs, suggest_project, analyse_Portfolio} = require('../controllers/v2controller');
const multer = require("multer");
const pdfParse = require("pdf-parse");
const upload = multer();


// Route to handle profile analysis
router.post('/profile-analysis', generateProfileAnalysis);
router.post("/compare-jds", upload.fields([{ name: 'jd1File' }, { name: 'jd2File' }]), compareJobs ) ; 
router.post("/suggestproject" , suggest_project); 
router.post("/analyseportfolio" , analyse_Portfolio); 

// Export the router
module.exports = router;