const express = require('express');
const router = express.Router();

// GET all authors
router.get('/', (req, res) => {
    res.json({ message: "List of all authors" });
});

// GET a specific author by ID
router.get('/:id', (req, res) => {
    res.json({ message: `Details for author ID: ${req.params.id}` });
});

module.exports = router;