const express = require('express');
const router = express.Router();
const luxuryCollectibleController = require('../controllers/luxuryCollectibleController');

// Filter LuxuryCollectibles
router.get('/filter', luxuryCollectibleController.filterLuxuryCollectibles);

// Create a new LuxuryCollectible
router.post('/', luxuryCollectibleController.createLuxuryCollectible);

// Get all LuxuryCollectibles
router.get('/', luxuryCollectibleController.getAllLuxuryCollectibles);

// Get a LuxuryCollectible by ID
router.get('/:id', luxuryCollectibleController.getLuxuryCollectibleById);

// Update a LuxuryCollectible by ID
router.put('/:id', luxuryCollectibleController.updateLuxuryCollectibleById);

// Delete a LuxuryCollectible by ID
router.delete('/:id', luxuryCollectibleController.deleteLuxuryCollectibleById);

module.exports = router;
