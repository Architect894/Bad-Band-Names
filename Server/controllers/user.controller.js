const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY;

module.exports = {
    registerUser: async (req, res) => {
        try {
            // Check if the user already exists
            const potentialUser = await User.findOne({ email: req.body.email });
            if (potentialUser) {
                return res.status(409).json({ message: 'This email already exists. Please log in.' });
            }

            // Create new user
            const newUser = await User.create(req.body);

            // Create a JWT token
            const userToken = jwt.sign({ id: newUser._id, email: newUser.email }, secretKey, { expiresIn: '2h' });
            console.log('User Token:', userToken);

            // Set token in HTTP-only cookie
            res.status(201).cookie('userToken', userToken, { httpOnly: true }).json(newUser);
        } catch (err) {
            console.error('Error during user registration:', err);
            res.status(500).json({ error: err.message || 'An unexpected error occurred during registration.' });
        }
    },

    loginUser: async (req, res) => {
        try {
            // Check if email exists in DB
            const potentialUser = await User.findOne({ email: req.body.email });
            if (!potentialUser) {
                return res.status(400).json({ message: 'Invalid email or password.' });
            }

            // Compare passwords
            const passwordsMatch = await bcrypt.compare(req.body.password, potentialUser.password);
            if (!passwordsMatch) {
                return res.status(400).json({ message: 'Invalid email or password.' });
            }

            // Create a JWT token
            const userToken = jwt.sign({ id: potentialUser._id, email: potentialUser.email }, secretKey, { expiresIn: '2h' });
            console.log('User Token:', userToken);

            // Set token in HTTP-only cookie
            res.status(200).cookie('userToken', userToken, { httpOnly: true }).json(potentialUser);
        } catch (err) {
            console.error('Error during user login:', err);
            res.status(500).json({ error: err.message || 'An unexpected error occurred during login.' });
        }
    },

    logoutUser: (req, res) => {
        console.log('Cookies before logout:', req.cookies);
        res.clearCookie('userToken');
        res.status(200).json({ message: 'User logged out successfully.' });
    }
};
