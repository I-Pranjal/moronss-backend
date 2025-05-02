const express = require('express');
const router = express.Router();
const { signInOrSignUpUser, getAllUsers } = require('../controllers/userController');


router.post('/', signInOrSignUpUser);
router.get('/', getAllUsers);



module.exports = router;
