const User = require('../models/user');

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
            return res.status(200).json({
                message: 'User signed in successfully',
                _id: user._id,
                name: user.name,
                email: user.email,
            });
        }

        // If user doesn't exist, sign up
        if (!name) {
            return res.status(400).json({ message: 'Name is required for sign up' });
        }

        user = await User.create({ name, email, password });

        res.status(201).json({
            message: 'User signed up successfully',
            _id: user._id,
            name: user.name,
            email: user.email,
        });
    } catch (error) {
        console.error('Error handling user:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { signInOrSignUpUser };
