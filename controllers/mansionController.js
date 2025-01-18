const Mansion = require('../models/Mansion');

// Create a new Mansion
exports.createMansion = async (req, res) => {
    try {
        const mansion = new Mansion(req.body);
        const savedMansion = await mansion.save();
        res.status(201).json({ message: 'Mansion created successfully', mansion: savedMansion });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all Mansions
exports.getAllMansions = async (req, res) => {
    try {
        const mansions = await Mansion.find();
        res.status(200).json(mansions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a single Mansion by ID
exports.getMansionById = async (req, res) => {
    try {
        const mansion = await Mansion.findById(req.params.id);
        if (!mansion) return res.status(404).json({ message: 'Mansion not found' });
        res.status(200).json(mansion);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a Mansion by ID
exports.updateMansionById = async (req, res) => {
    try {
        const updatedMansion = await Mansion.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedMansion) return res.status(404).json({ message: 'Mansion not found' });
        res.status(200).json({ message: 'Mansion updated successfully', mansion: updatedMansion });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete a Mansion by ID
exports.deleteMansionById = async (req, res) => {
    try {
        const deletedMansion = await Mansion.findByIdAndDelete(req.params.id);
        if (!deletedMansion) return res.status(404).json({ message: 'Mansion not found' });
        res.status(200).json({ message: 'Mansion deleted successfully', mansion: deletedMansion });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Filter Mansions
exports.filterMansions = async (req, res) => {
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
            propertyType, // Filter by property type
            schools, // Filter by nearby schools
            parks, // Filter by nearby parks
            transportation, // Filter by nearby transport options
            attractions // Filter by nearby attractions
        } = req.query;

        console.log("query 🙄🙄", req.query);

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
        const mansions = await Mansion.find(query);
        res.status(200).json(mansions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

