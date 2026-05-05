const Task = require('../models/taskModel');

exports.getTasks = (req, res) => res.json(Task.getAll());

exports.getTaskById = (req, res) => {
    const task = Task.getById(parseInt(req.params.id));
    task ? res.json(task) : res.status(404).json({ error: 'Task not found' });
};

exports.createTask = (req, res) => {
    const { title, description } = req.body;
    if (!title) return res.status(400).json({ error: 'Title is required' });
    res.status(201).json(Task.create(title, description));
};

exports.updateTask = (req, res) => {
    const task = Task.update(parseInt(req.params.id), req.body);
    task ? res.json(task) : res.status(404).json({ error: 'Task not found' });
};

exports.deleteTask = (req, res) => {
    const deletedTask = Task.delete(parseInt(req.params.id));
    deletedTask ? res.json({ message: 'Deleted', task: deletedTask }) : res.status(404).json({ error: 'Not found' });
};