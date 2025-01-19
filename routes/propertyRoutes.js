const express = require('express');
const router = express.Router();
const propertyController = require('../controllers/propertyController');

// Delete all Properties
router.delete('/delete-all', propertyController.deleteAllProperties);

// Create a new Property
router.post('/', propertyController.createProperty);

// Get all Properties
router.get('/', propertyController.getAllProperties);

// Get a Property by ID
router.get('/:id', propertyController.getPropertyById);

// Update a Property by ID
router.put('/:id', propertyController.updatePropertyById);

// Delete a Property by ID
router.delete('/:id', propertyController.deletePropertyById);


module.exports = router;
