const express = require('express');
const app = express();
const PORT = 3000;

// Home Route
app.get('/', (req, res) => {
    res.send('Welcome to the Express Home Page!');
});

// About Route
app.get('/about', (req, res) => {
    res.send('This is the About Page built with Express.');
});

// Contact Route
app.get('/contact', (req, res) => {
    res.json({
        message: "Contact us via email",
        email: "hello@express-server.com"
    });
});

// 404 Handler (Middleware)
app.use((req, res) => {
    res.status(404).send('404: Page Not Found');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Express server is live at http://localhost:${PORT}`);
});