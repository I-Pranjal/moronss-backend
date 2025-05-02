const express = require('express');
const { submitFormOne, submitFormTwo } = require('../controllers/formController'); // Adjust the path as needed

const router = express.Router();

router.post('/formone', submitFormOne);
router.post('/formtwo', submitFormTwo);

module.exports = router;