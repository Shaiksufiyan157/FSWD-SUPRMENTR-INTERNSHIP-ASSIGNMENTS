const express = require('express');
const router = express.Router();

// GET all books
router.get('/', (req, res) => {
    res.json({ message: "List of all books" });
});

// GET a specific book by ID
router.get('/:id', (req, res) => {
    res.json({ message: `Details for book ID: ${req.params.id}` });
});

module.exports = router;