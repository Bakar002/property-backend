const mongoose = require('mongoose');

const MansionSchema = new mongoose.Schema({
    name: { type: String, required: true }, // Name of the mansion
    propertyType: { type: String, default: 'Mansion' }, // Property type
    location: {
        city: { type: String, required: true },
        state: { type: String, required: true },
        country: { type: String, required: true }, // Country field
        coordinates: {
            type: [Number], // GeoJSON: [longitude, latitude]
            required: true,
        },
    },
    floorPlan: { type: String }, // URL of floor plan image or PDF
    neighborhoodDetails: { // Neighborhood details as a nested object
        schools: [{ type: String }], // Nearby schools
        parks: [{ type: String }], // Nearby parks
        transportation: [{ type: String }], // Nearby transport options
        attractions: [{ type: String }], // Local attractions
    },
    size: { type: Number, required: true, min: 0 }, // Size in square feet
    bedrooms: { type: Number, required: true, min: 0 },
    bathrooms: { type: Number, required: true, min: 0 },
    price: { type: Number, required: true, min: 0 }, // Price in USD
    amenities: [{ type: String }], // List of amenities, e.g., pool, gym
    description: { type: String }, // Detailed description of the mansion
    images: [{ type: String, required: true }], // URLs of high-resolution images
    listedDate: { type: Date, default: Date.now }, // Date of listing
    isAvailable: { type: Boolean, default: true }, // Availability status
    // Newly Added Fields
    status: { type: String, default: 'Available' }, // Listing status
    views: { type: Number, default: 0 }, // Number of views
    followers: { type: Number, default: 0 }, // Number of followers
    isFeatured: { type: Boolean, default: false }, // Featured status
    isFollowed: { type: Boolean, default: false }, // Followed by the user
});

module.exports = mongoose.model('Mansion', MansionSchema);
