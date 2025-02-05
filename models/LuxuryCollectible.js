const mongoose = require('mongoose');

const LuxuryCollectibleSchema = new mongoose.Schema({
    name: { type: String, required: true }, // Name of the collectible
    category: {
        type: String,
        enum: ['Watches', 'Cars', 'Jewelry', 'Art', 'Other'], // Predefined categories
        required: true,
    },
    brand: { type: String }, // Brand or maker of the collectible
    year: { type: Number, min: 1000, max: new Date().getFullYear() }, // Year of creation
    price: { type: Number, required: true, min: 0 }, // Price in USD
    description: { type: String, required: true }, // Detailed description of the collectible
    images: [{ type: String, required: true }], // URLs of high-resolution images
    dimensions: { // Dimensions for physical items
        length: { type: Number, min: 0 },
        width: { type: Number, min: 0 },
        height: { type: Number, min: 0 },
    },
    materials: [{ type: String }], // Materials used, e.g., gold, leather, etc.
    isAvailable: { type: Boolean, default: true }, // Availability status
    listedDate: { type: Date, default: Date.now }, // Date of listing
});

module.exports = mongoose.model('LuxuryCollectible', LuxuryCollectibleSchema);
