const express = require('express');
const router = express.Router();
const { signInOrSignUpUser, getAllUsers, signInWithGoogle } = require('../controllers/userController');


router.post('/', signInOrSignUpUser);
router.get('/', getAllUsers);
router.post('/google', signInWithGoogle);



module.exports = router;
