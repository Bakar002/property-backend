const express = require('express');
const router = express.Router();
const mansionController = require('../controllers/mansionController');

router.get('/filter', mansionController.filterMansions);

// Route to delete all mansions
router.delete('/delete-all', mansionController.deleteAllMansions);

// Create a new Mansion
router.post('/', mansionController.createMansion);

// Get all Mansions
router.get('/', mansionController.getAllMansions);

// Get a Mansion by ID
router.get('/:id', mansionController.getMansionById);

// Update a Mansion by ID
router.put('/:id', mansionController.updateMansionById);

// Delete a Mansion by ID
router.delete('/:id', mansionController.deleteMansionById);


module.exports = router;
