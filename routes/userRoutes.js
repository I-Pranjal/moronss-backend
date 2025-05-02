const express = require('express');
const router = express.Router();
const { signInOrSignUpUser } = require('../controllers/userController');

router.post('/', signInOrSignUpUser);

module.exports = router;
