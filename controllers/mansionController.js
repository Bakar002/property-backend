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

// Delete All Mansions
exports.deleteAllMansions = async (req, res) => {
    try {
        const result = await Mansion.deleteMany({});
        res.status(200).json({
            message: 'All mansions have been deleted successfully',
            deletedCount: result.deletedCount,
        });
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
            radius, // For map-based filtering
            propertyType, // Property type
            schools, // Nearby schools
            parks, // Nearby parks
            transportation, // Nearby transport options
            attractions, // Nearby attractions
            amenities, // List of amenities
            isFeatured, // Whether the property is featured
            isAvailable, // Availability status
            status, 
        } = req.query;

        // Build query object
        const query = {};

        // Price range
        if (priceMin || priceMax) {
            query.price = {};
            if (priceMin) query.price.$gte = Number(priceMin);
            if (priceMax) query.price.$lte = Number(priceMax);
        }

        // Bedrooms and bathrooms
        if (bedrooms) query.bedrooms = { $gte: Number(bedrooms) };
        if (bathrooms) query.bathrooms = { $gte: Number(bathrooms) };

        // Location
        if (city) query['location.city'] = city;
        if (state) query['location.state'] = state;
        if (country) query['location.country'] = country;

        // Geo-based filtering
        if (latitude && longitude && radius) {
            const RADIUS_IN_METERS = Number(radius) * 1000;
            query['location.coordinates'] = {
                $geoWithin: {
                    $centerSphere: [
                        [Number(longitude), Number(latitude)],
                        RADIUS_IN_METERS / 6378100,
                    ],
                },
            };
        }

        // Property type
        if (propertyType) query.propertyType = propertyType;

        // Neighborhood details
        if (schools) query['neighborhoodDetails.schools'] = { $in: schools.split(',') };
        if (parks) query['neighborhoodDetails.parks'] = { $in: parks.split(',') };
        if (transportation)
            query['neighborhoodDetails.transportation'] = { $in: transportation.split(',') };
        if (attractions) query['neighborhoodDetails.attractions'] = { $in: attractions.split(',') };

        // Amenities (match any of the provided amenities)
        if (amenities) query.amenities = { $in: amenities.split(',') };

        // Status and availability
        if (status) query.status = status;
        if (isAvailable !== undefined) query.isAvailable = isAvailable === 'true';

        // Featured filter
        if (isFeatured !== undefined) query.isFeatured = isFeatured === 'true';

        // Execute the query
        const mansions = await Mansion.find(query);
        res.status(200).json(mansions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


