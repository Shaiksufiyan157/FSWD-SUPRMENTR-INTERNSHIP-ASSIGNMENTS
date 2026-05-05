const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();

const JWT_SECRET = 'super_secret_key_change_me_in_production';

// 1. Authentication Middleware (Verifies Token)
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Format: "Bearer <token>"

    if (!token) return res.status(401).json({ error: 'Access denied. No token provided.' });

    jwt.verify(token, JWT_SECRET, (err, decodedUser) => {
        if (err) return res.status(403).json({ error: 'Invalid token.' });
        req.user = decodedUser; // Attach payload (e.g., { userId, role }) to request object
        next();
    });
};

// 2. Authorization Middleware (Role Guard)
const authorizeRole = (requiredRole) => {
    return (req, res, next) => {
        if (req.user.role !== requiredRole) {
            return res.status(403).json({ error: `Access denied. Requires ${requiredRole} privileges.` });
        }
        next();
    };
};

// --- Protected Routes ---

// Open to any authenticated user
app.get('/profile', authenticateToken, (req, res) => {
    res.json({ message: 'Welcome to your profile', userId: req.user.userId });
});

// Strictly restricted to admins
app.post('/admin/system-settings', authenticateToken, authorizeRole('admin'), (req, res) => {
    res.json({ message: 'System settings updated securely.' });
});