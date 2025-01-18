const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true }, // User's full name
    email: { type: String, required: true, unique: true }, // User's email
    password: { type: String, required: true }, // Hashed password
    savedSearches: [
        {
            filters: { type: Object }, // JSON object containing search filters
            createdAt: { type: Date, default: Date.now },
        },
    ],
    bookmarks: [
        {
            listingId: { type: mongoose.Schema.Types.ObjectId, refPath: 'bookmarks.listingType' },
            listingType: { type: String, enum: ['Mansion', 'Penthouse', 'LuxuryCollectible'] },
            addedAt: { type: Date, default: Date.now },
        },
    ],
    notifications: [
        {
            message: { type: String },
            isRead: { type: Boolean, default: false },
            createdAt: { type: Date, default: Date.now },
        },
    ],
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
