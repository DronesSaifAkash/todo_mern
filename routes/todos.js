const express = require('express');
const router = express.Router();
const Todo = require('../models/todo');

// Get all todos
router.get('/', async (req, res) => {
    const todos = await Todo.find();
    res.json(todos);
});

// Create a new todo
router.post('/', async (req, res) => {
    const newTodo = new Todo({
        text: req.body.text,
    });
    await newTodo.save();
    res.json(newTodo);
});

// Update a todo
router.put('/:id', async (req, res) => {
    const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, { completed: req.body.completed }, { new: true });
    res.json(updatedTodo);
});

// Delete a todo
router.delete('/:id', async (req, res) => {
    await Todo.findByIdAndDelete(req.params.id);
    res.json({ message: 'Todo deleted' });
});

module.exports = router;
