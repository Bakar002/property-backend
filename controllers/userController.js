require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Signup API
exports.signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: 'User already exists' });

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const user = new User({ name, email, password: hashedPassword });
        await user.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Login API
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Invalid email or password' });

        // Verify password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid email or password' });

        // Create a token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET , { expiresIn: '1h' });

        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Save a search
exports.saveSearch = async (req, res) => {
    try {
        const { userId, filters } = req.body;
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: 'User not found' });

        user.savedSearches.push({ filters });
        await user.save();
        res.status(200).json({ message: 'Search saved successfully', savedSearches: user.savedSearches });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Bookmark a listing
exports.addBookmark = async (req, res) => {
    try {
        const { userId, listingId, listingType } = req.body;
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: 'User not found' });

        user.bookmarks.push({ listingId, listingType });
        await user.save();
        res.status(200).json({ message: 'Listing bookmarked successfully', bookmarks: user.bookmarks });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get notifications
exports.getNotifications = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: 'User not found' });

        res.status(200).json({ notifications: user.notifications });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Mark notifications as read
exports.markNotificationsAsRead = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: 'User not found' });

        user.notifications.forEach((notification) => {
            notification.isRead = true;
        });

        await user.save();
        res.status(200).json({ message: 'Notifications marked as read' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
