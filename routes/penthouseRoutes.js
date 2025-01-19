const express = require('express');
const router = express.Router();
const penthouseController = require('../controllers/penthouseController');

router.get('/filter', penthouseController.filterPenthouses);

// Route to delete all penthouses
router.delete('/delete-all', penthouseController.deleteAllPenthouses);

// Create a new Penthouse
router.post('/', penthouseController.createPenthouse);

// Get all Penthouses
router.get('/', penthouseController.getAllPenthouses);

// Get a Penthouse by ID
router.get('/:id', penthouseController.getPenthouseById);

// Update a Penthouse by ID
router.put('/:id', penthouseController.updatePenthouseById);

// Delete a Penthouse by ID
router.delete('/:id', penthouseController.deletePenthouseById);

module.exports = router;
