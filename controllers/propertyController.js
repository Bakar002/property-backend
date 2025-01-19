const Property = require('../models/Property');

// Create a new Property
exports.createProperty = async (req, res) => {
    try {
        const property = new Property(req.body);
        const savedProperty = await property.save();
        res.status(201).json({ message: 'Property created successfully', property: savedProperty });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all Properties
exports.getAllProperties = async (req, res) => {
    try {
        const properties = await Property.find();
        res.status(200).json(properties);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a single Property by ID
exports.getPropertyById = async (req, res) => {
    try {
        const property = await Property.findById(req.params.id);
        if (!property) return res.status(404).json({ message: 'Property not found' });
        res.status(200).json(property);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a Property by ID
exports.updatePropertyById = async (req, res) => {
    try {
        const updatedProperty = await Property.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedProperty) return res.status(404).json({ message: 'Property not found' });
        res.status(200).json({ message: 'Property updated successfully', property: updatedProperty });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete a Property by ID
exports.deletePropertyById = async (req, res) => {
    try {
        const deletedProperty = await Property.findByIdAndDelete(req.params.id);
        if (!deletedProperty) return res.status(404).json({ message: 'Property not found' });
        res.status(200).json({ message: 'Property deleted successfully', property: deletedProperty });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete All Properties
exports.deleteAllProperties = async (req, res) => {
    try {
        const result = await Property.deleteMany({});
        res.status(200).json({
            message: 'All properties have been deleted successfully',
            deletedCount: result.deletedCount,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
