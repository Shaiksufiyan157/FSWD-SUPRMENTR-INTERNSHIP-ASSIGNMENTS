// server/routes/userRoutes.js
const express = require('express');
const router = express.Router();

const users = [
  { id: 1, name: "John" },
  { id: 2, name: "Doe" }
];

router.get('/users', (req, res) => {
  res.json(users);
});

module.exports = router;