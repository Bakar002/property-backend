const Penthouse = require('../models/Penthouse');

// Create a new Penthouse
exports.createPenthouse = async (req, res) => {
    try {
        const penthouse = new Penthouse(req.body);
        const savedPenthouse = await penthouse.save();
        res.status(201).json({ message: 'Penthouse created successfully', penthouse: savedPenthouse });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all Penthouses
exports.getAllPenthouses = async (req, res) => {
    try {
        const penthouses = await Penthouse.find();
        res.status(200).json(penthouses);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a Penthouse by ID
exports.getPenthouseById = async (req, res) => {
    try {
        const penthouse = await Penthouse.findById(req.params.id);
        if (!penthouse) return res.status(404).json({ message: 'Penthouse not found' });
        res.status(200).json(penthouse);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a Penthouse by ID
exports.updatePenthouseById = async (req, res) => {
    try {
        const updatedPenthouse = await Penthouse.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedPenthouse) return res.status(404).json({ message: 'Penthouse not found' });
        res.status(200).json({ message: 'Penthouse updated successfully', penthouse: updatedPenthouse });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete a Penthouse by ID
exports.deletePenthouseById = async (req, res) => {
    try {
        const deletedPenthouse = await Penthouse.findByIdAndDelete(req.params.id);
        if (!deletedPenthouse) return res.status(404).json({ message: 'Penthouse not found' });
        res.status(200).json({ message: 'Penthouse deleted successfully', penthouse: deletedPenthouse });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete All Penthouses
exports.deleteAllPenthouses = async (req, res) => {
    try {
        const result = await Penthouse.deleteMany({});
        res.status(200).json({
            message: 'All penthouses have been deleted successfully',
            deletedCount: result.deletedCount,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.filterPenthouses = async (req, res) => {
    try {
        const {
            priceMin,
            priceMax,
            bedrooms,
            bathrooms,
            city,
            state,
            country,
            latitude,
            longitude,
            radius, // In kilometers, for map-based filtering
            propertyType,
            schools, // Filter by nearby schools
            parks,   // Filter by nearby parks
            transportation, // Filter by nearby transport options
            attractions // Filter by nearby attractions
        } = req.query;

        // Build query object dynamically
        const query = {};

        // Filter by price range
        if (priceMin || priceMax) {
            query.price = {};
            if (priceMin) query.price.$gte = Number(priceMin);
            if (priceMax) query.price.$lte = Number(priceMax);
        }

        // Filter by number of bedrooms and bathrooms
        if (bedrooms) query.bedrooms = { $gte: Number(bedrooms) };
        if (bathrooms) query.bathrooms = { $gte: Number(bathrooms) };

        // Filter by location
        if (city) query['location.city'] = city;
        if (state) query['location.state'] = state;
        if (country) query['location.country'] = country;

        // Filter by property type
        if (propertyType) query.propertyType = propertyType;

        // Filter by proximity to a location (latitude, longitude)
        if (latitude && longitude && radius) {
            const RADIUS_IN_METERS = Number(radius) * 1000; // Convert km to meters
            query['location.coordinates'] = {
                $geoWithin: {
                    $centerSphere: [
                        [Number(longitude), Number(latitude)],
                        RADIUS_IN_METERS / 6378100 // Convert radius to radians
                    ]
                }
            };
        }

        // Filter by neighborhood details (e.g., schools, parks, transportation, attractions)
        if (schools) query['neighborhoodDetails.schools'] = { $in: [schools] };
        if (parks) query['neighborhoodDetails.parks'] = { $in: [parks] };
        if (transportation) query['neighborhoodDetails.transportation'] = { $in: [transportation] };
        if (attractions) query['neighborhoodDetails.attractions'] = { $in: [attractions] };

        // Execute query
        const penthouses = await Penthouse.find(query);
        res.status(200).json(penthouses);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
