const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// In-memory data store (resets when server restarts)
let items = [
    { id: 1, name: "Data from Backend" },
    { id: 2, name: "Another Server Item" }
];

// GET: Send the array to the frontend
app.get('/api/items', (req, res) => {
    res.json(items);
});

// POST: Receive new data from the frontend
app.post('/api/items', (req, res) => {
    const newItem = { id: Date.now(), name: req.body.name };
    items.push(newItem);
    res.status(201).json(newItem);
});

app.listen(5000, () => console.log('Server running on http://localhost:5000'));