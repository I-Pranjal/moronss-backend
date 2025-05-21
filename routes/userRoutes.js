const express = require('express');
const router = express.Router();
const { signInOrSignUpUser, getAllUsers, signInWithGoogle, updateUserDetails } = require('../controllers/userController');


router.post('/', signInOrSignUpUser);
router.get('/', getAllUsers);
router.post('/google', signInWithGoogle);
router.put('/update', updateUserDetails);



module.exports = router;
