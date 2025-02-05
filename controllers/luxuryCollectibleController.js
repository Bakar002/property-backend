const LuxuryCollectible = require('../models/LuxuryCollectible');

// Create a new LuxuryCollectible
exports.createLuxuryCollectible = async (req, res) => {
    try {
        const collectible = new LuxuryCollectible(req.body);
        const savedCollectible = await collectible.save();
        res.status(201).json({ message: 'Luxury Collectible created successfully', collectible: savedCollectible });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all LuxuryCollectibles
exports.getAllLuxuryCollectibles = async (req, res) => {
    try {
        const collectibles = await LuxuryCollectible.find();
        res.status(200).json(collectibles);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a LuxuryCollectible by ID
exports.getLuxuryCollectibleById = async (req, res) => {
    try {
        const collectible = await LuxuryCollectible.findById(req.params.id);
        if (!collectible) return res.status(404).json({ message: 'Luxury Collectible not found' });
        res.status(200).json(collectible);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a LuxuryCollectible by ID
exports.updateLuxuryCollectibleById = async (req, res) => {
    try {
        const updatedCollectible = await LuxuryCollectible.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedCollectible) return res.status(404).json({ message: 'Luxury Collectible not found' });
        res.status(200).json({ message: 'Luxury Collectible updated successfully', collectible: updatedCollectible });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete a LuxuryCollectible by ID
exports.deleteLuxuryCollectibleById = async (req, res) => {
    try {
        const deletedCollectible = await LuxuryCollectible.findByIdAndDelete(req.params.id);
        if (!deletedCollectible) return res.status(404).json({ message: 'Luxury Collectible not found' });
        res.status(200).json({ message: 'Luxury Collectible deleted successfully', collectible: deletedCollectible });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete All LuxuryCollectibles
exports.deleteAllLuxuryCollectibles = async (req, res) => {
    try {
        const result = await LuxuryCollectible.deleteMany({});
        res.status(200).json({
            message: 'All luxury collectibles have been deleted successfully',
            deletedCount: result.deletedCount,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Filter LuxuryCollectibles
exports.filterLuxuryCollectibles = async (req, res) => {
    try {
        const {
            priceMin,
            priceMax,
            category,
            yearMin,
            yearMax,
            brand,
            isAvailable
        } = req.query;

        // Build query object dynamically
        const query = {};

        // Filter by price range
        if (priceMin || priceMax) {
            query.price = {};
            if (priceMin) query.price.$gte = Number(priceMin);
            if (priceMax) query.price.$lte = Number(priceMax);
        }

        // Filter by category
        if (category) query.category = category;

        // Filter by year range
        if (yearMin || yearMax) {
            query.year = {};
            if (yearMin) query.year.$gte = Number(yearMin);
            if (yearMax) query.year.$lte = Number(yearMax);
        }

        // Filter by brand
        if (brand) query.brand = brand;

        // Filter by availability
        if (isAvailable !== undefined) query.isAvailable = isAvailable === 'true';

        // Execute query
        const collectibles = await LuxuryCollectible.find(query);
        res.status(200).json(collectibles);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};