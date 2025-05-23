const User = require('../models/user');
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const axios = require('axios');
const googleTokenEndpoint = 'https://oauth2.googleapis.com/token';

// @desc    Sign in or sign up a user
// @route   POST /api/users
// @access  Public
const signInOrSignUpUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Basic validation
        if (!email || !password) {
            return res.status(400).json({ message: 'Please provide email and password' });
        }

        // Check if user already exists
        let user = await User.findOne({ email });
        if (user) {
            // Sign in logic
            res.status(200).json({
        message: 'User signed in successfully',
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          profilePicture: user.profilePictureUrl,
          randomInteger: user.randomInteger,
        },
      });
        }

        // If user doesn't exist, sign up
        if (!name) {
            return res.status(400).json({ message: 'Name is required for sign up' });
        }

        user = await User.create({ name, email, password });

        res.status(200).json({
        message: 'User signed in successfully',
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          profilePicture: user.profilePictureUrl,
          randomInteger: user.randomInteger,
        },
      });
    } catch (error) {
        console.error('Error handling user:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password'); // Exclude passwords
        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching users:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
};


const signInWithGoogle = async (req, res) => {
    try {
      const { token } = req.body;
  
      if (!token) {
        return res.status(400).json({ message: 'Token is required' });
      }
  
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
  
      const payload = ticket.getPayload();
      const { email, name, picture } = payload;
  
      let user = await User.findOne({ email });
      if (!user) {
        user = await User.create({ name, email, profilePictureUrl: picture });
      }
  
  
      res.status(200).json({
        message: 'User signed in successfully',
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          profilePicture: user.profilePictureUrl,
          randomInteger: user.randomInteger,
        },
      });
  
    } catch (error) {
      console.error('Error during Google sign-in process:', error);
      res.status(500).json({ message: 'Error during Google sign-in process' });
    }
  };
  

// Get details of a user by randomInteger
const getUserByRandomInteger = async (req, res) => {
    const { randomInteger } = req.params;
    console.log('Fetching user by randomInteger:', randomInteger);

    try {
        const user = await User.findOne({ randomInteger });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error('Error fetching user:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
}  
 
// Update user Details 
const updateUserDetails = async (req, res) => {
    const { name, email, profilePictureUrl, randomInteger } = req.body;
    const userId = randomInteger;
    console.log('Updating user details');

    try {
      console.log('Received data:', req.body);
        const updatedUser = await User.findOneAndUpdate(
            {randomInteger},
            { name, email, profilePictureUrl },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(updatedUser);
    } catch (error) {
        console.error('Error updating user details:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
};
  







module.exports = { 
    signInOrSignUpUser,
    getAllUsers ,
    signInWithGoogle,
    updateUserDetails,
    getUserByRandomInteger
    };

