const Todo = require('../models/todo');
const mongoose = require('mongoose');
const SubTask = require('../models/subtask');

// Get all todos
exports.getTodos = async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server Error' });
  }
};

// Get a single todo by ID
exports.getTodoById = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    res.json(todo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server Error' });
  }
};

// Create a new todo
exports.createTodo = async (req, res) => {
  try {
    const { id, title, description, category, status } = req.body;
    const todo = new Todo({
      id,
      title,
      description,
      category,
      status,
    });
    await todo.save();
    res.json(todo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server Error' });
  }
};

// Update a todo
exports.updateTodo = async (req, res) => {
  try {
    const { title, description, category, status } = req.body;
    const todo = await Todo.updateOne(
      req.body.id,
      { title, description, category, status },
      { new: true }
    );
    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    res.json(todo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server Error' });
  }
};

// Delete a todo
exports.deleteTodo = async (req, res) => {
  try {
    console.log(req.params.id);
    const todo = await Todo.deleteOne(req.body.id); //Number(req.params.id) or deleteOne(req.body.id) or findByIdAndDelete(req.body.id)
    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    res.json({ message: 'Todo deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server Error' });
  }
};

// Create a new subtask for a todo
exports.createSubTask = async (req, res) => {
  console.log('hello');
  try {
    const id = req.params;
    const title = req.body;

    console.log(id);

    const isValidObjectId = mongoose.Types.ObjectId.isValid(id);
    if (!isValidObjectId) {
      return res.status(404).json({ error: 'Invalid todo ID' });
    }

    const todo = await Todo.findById(id);
    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    const subtask = new SubTask({
      title,
      todoId: todo.id,
    });
    console.log(subtask);

    await subtask.save();

    todo.subtasks.push(subtask);
    await todo.save();

    res.status(201).json(subtask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Update a subtask
exports.updateSubTask = async (req, res) => {
  try {
    const { todoId, subtaskId } = req.params;
    const { title } = req.body;

    const todo = await Todo.findById(todoId);
    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    const subtask = await SubTask.updateOne(
      { _id: subtaskId, todoId: todo._id },
      { title },
      { new: true }
    );

    if (!subtask) {
      return res.status(404).json({ error: 'Subtask not found' });
    }

    res.json(subtask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Delete a subtask
exports.deleteSubTask = async (req, res) => {
  try {
    const { todoId, subtaskId } = req.params;

    const todo = await Todo.findById(todoId);
    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    const subtask = await SubTask.deleteOne({
      _id: subtaskId,
      todoId: todo._id,
    });

    if (!subtask) {
      return res.status(404).json({ error: 'Subtask not found' });
    }

    todo.subtasks.pull(subtask._id);
    await todo.save();

    res.json({ message: 'Subtask deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};
