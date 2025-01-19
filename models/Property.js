const mongoose = require('mongoose');

const PropertySchema = new mongoose.Schema({
    image: { type: String, required: true }, // Image URL
    title: { type: String, required: true }, // Title of the property
    location: { type: String, required: true }, // Location of the property
});

module.exports = mongoose.model('Property', PropertySchema);
