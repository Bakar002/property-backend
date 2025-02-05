const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Signup
router.post('/signup', userController.signup);

// Login
router.post('/login', userController.login);

// Save searches
router.post('/save-search', userController.saveSearch);

// Bookmark a listing
router.post('/bookmark', userController.addBookmark);

// Get notifications
router.get('/:userId/notifications', userController.getNotifications);

// Mark notifications as read
router.put('/:userId/notifications/read', userController.markNotificationsAsRead);

module.exports = router;
