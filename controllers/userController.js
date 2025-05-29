const User = require('../models/user');
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const axios = require('axios');
const googleTokenEndpoint = 'https://oauth2.googleapis.com/token';
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret"; 

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
          profilePictureUrl: user.profilePictureUrl,
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
          profilePictureUrl: user.profilePictureUrl,
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
          profilePictureUrl: user.profilePictureUrl,
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
  

const fetchAccessToken = async (code) => {
  const url = `https://www.linkedin.com/oauth/v2/accessToken?code=${code}&client_id=866rz0asjacoqy&client_secret=WPL_AP1.uUO1sfdl8exfjMa2.wpNLwg==&redirect_uri=https://moronss-backend.onrender.com/api/linkedin/callback&grant_type=authorization_code&scope=liteprofile%20emailaddress`;

  try {
    const response = await axios.get(url);
    return response.data.access_token;
  } catch (error) {
    console.error("Error fetching access token:", error.message);
    throw new Error("Failed to fetch access token");
  }
};

const fetchLinkedInUserInfo = async (accessToken) => {
  try {
    const response = await axios.get('https://api.linkedin.com/v2/userinfo', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        scope: 'r_emailaddress',
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching user info:", error.message);
    throw new Error("Failed to fetch user info");
  }
};

// const signInWithLinkedIn = async (req, res) => {
//   try {
//     const { code } = req.query;

//     if (!code) {
//       return res.status(400).json({ error: "Authorization code is required" });
//     }

//     const accessToken = await fetchAccessToken(code);
//     console.log("The obtained access token is:", accessToken);

//     const userInfo = await fetchLinkedInUserInfo(accessToken);
//     console.log("User info from LinkedIn:", userInfo);
//     const newUser = await registerLinkedInUser(userInfo);
//     res.json(newUser.user);
//   } catch (error) {
//     console.error("Unexpected error:", error.message);
//     res.status(500).json({ error: error.message });
//   }
// };


const signInWithLinkedIn = async (req, res) => {
  try {
    const { code } = req.query;

    if (!code) {
      return res.status(400).json({ error: "Authorization code is required" });
    }

    const accessToken = await fetchAccessToken(code);
    console.log("The obtained access token is:", accessToken);

    const userInfo = await fetchLinkedInUserInfo(accessToken);
    console.log("User info from LinkedIn:", userInfo);

    const { user } = await registerLinkedInUser(userInfo);


    const payload = {
      _id: user._id,
      name: user.name,
      email: user.email,
      profilePictureUrl: user.profilePictureUrl,
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });

    res.redirect(`https://morons-frontend.vercel.app/linkedinCallback?token=${token}`);


  } catch (error) {
    console.error("Unexpected error:", error.message);
    res.status(500).json({ error: error.message });
  }
};


const registerLinkedInUser = async (userInfo) => {
  console.log("Registering LinkedIn user with info:", userInfo);
  try {
    if (!userInfo || !userInfo.email) {
      throw new Error('LinkedIn user info with a valid email is required');
    }

    const { email, name, picture } = userInfo;

    // Check if user already exists
    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        name,
        email,
        profilePictureUrl: picture,
        password: "LinkedIn" // optional placeholder if using OAuth-only
      });
    }

    console.log("User registered or found:", user);
    return {
      success: true,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        profilePictureUrl: user.profilePictureUrl,
        randomInteger: user.randomInteger,
      },
    };
  } catch (error) {
    console.error('Error during LinkedIn sign-in process:', error.message);
    return {
      success: false,
      error: error.message,
    };
  }
};








module.exports = { 
    signInOrSignUpUser,
    getAllUsers ,
    signInWithGoogle,
    updateUserDetails,
    getUserByRandomInteger,
    signInWithLinkedIn
    };

