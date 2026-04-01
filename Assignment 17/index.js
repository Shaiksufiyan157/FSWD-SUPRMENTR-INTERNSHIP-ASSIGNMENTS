const express = require('express');
const app = express();
const PORT = 3000;

// Import Routers
const bookRoutes = require('./routes/books');
const authorRoutes = require('./routes/authors');

// Use Routers
app.use('/books', bookRoutes);
app.use('/authors', authorRoutes);

app.get('/', (req, res) => {
    res.send('Welcome to the Bookstore API');
});

app.listen(PORT, () => {
    console.log(`Bookstore server running at http://localhost:${PORT}`);
});