const mongoose = require('mongoose');

const PenthouseSchema = new mongoose.Schema({
    name: { type: String, required: true }, // Name of the penthouse
    buildingName: { type: String, required: true }, // Name of the building
    propertyType: { type: String, default: 'Penthouse' }, // Property type
    location: {
        city: { type: String, required: true },
        state: { type: String, required: true },
        country: { type: String, required: true }, // Country field
    },
    floorPlan: { type: String }, // URL of floor plan image or PDF
    neighborhoodDetails: {
        schools: [{ type: String }],
        parks: [{ type: String }],
        transportation: [{ type: String }],
        attractions: [{ type: String }],
    },
    floorNumber: { type: Number, required: true, min: 0 }, // Floor number of the penthouse
    size: { type: Number, required: true, min: 0 }, // Size in square feet
    bedrooms: { type: Number, required: true, min: 0 },
    bathrooms: { type: Number, required: true, min: 0 },
    terraceSize: { type: Number, min: 0 }, // Size of the terrace in square feet
    price: { type: Number, required: true, min: 0 }, // Price in USD
    amenities: [{ type: String }], // List of amenities, e.g., rooftop pool, private elevator
    description: { type: String }, // Detailed description of the penthouse
    images: [{ type: String, required: true }], // URLs of high-resolution images
    listedDate: { type: Date, default: Date.now }, // Date of listing
    isAvailable: { type: Boolean, default: true }, // Availability status
});

module.exports = mongoose.model('Penthouse', PenthouseSchema);
