

// server/server.js
import express from 'express';
const app = express();
import userRoutes from '.userRoutes';

app.use('/api', userRoutes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});