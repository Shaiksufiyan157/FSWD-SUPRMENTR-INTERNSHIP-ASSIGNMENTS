// server.js
const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to parse JSON
app.use(express.json());

// In-memory database for testing
let tasks = [];
let currentId = 1;

// CREATE: Add a new task
app.post('/tasks', (req, res) => {
    const { title, description } = req.body;
    if (!title) return res.status(400).json({ error: 'Title is required' });
    
    const newTask = { id: currentId++, title, description, completed: false };
    tasks.push(newTask);
    res.status(201).json(newTask);
});

// READ: Get all tasks
app.get('/tasks', (req, res) => {
    res.json(tasks);
});

// READ: Get a specific task by ID
app.get('/tasks/:id', (req, res) => {
    const task = tasks.find(t => t.id === parseInt(req.params.id));
    if (!task) return res.status(404).json({ error: 'Task not found' });
    res.json(task);
});

// UPDATE: Update a task by ID
app.put('/tasks/:id', (req, res) => {
    const task = tasks.find(t => t.id === parseInt(req.params.id));
    if (!task) return res.status(404).json({ error: 'Task not found' });

    const { title, description, completed } = req.body;
    if (title !== undefined) task.title = title;
    if (description !== undefined) task.description = description;
    if (completed !== undefined) task.completed = completed;

    res.json(task);
});

// DELETE: Remove a task by ID
app.delete('/tasks/:id', (req, res) => {
    const taskIndex = tasks.findIndex(t => t.id === parseInt(req.params.id));
    if (taskIndex === -1) return res.status(404).json({ error: 'Task not found' });

    const deletedTask = tasks.splice(taskIndex, 1);
    res.json({ message: 'Task deleted successfully', task: deletedTask[0] });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});