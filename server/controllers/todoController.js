const Todo = require('../models/todo');

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
    const { id, title, description, status } = req.body;
    const todo = new Todo({
      id,
      title,
      description,
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
    const { title, description, status } = req.body;
    const todo = await Todo.updateOne(
      req.body.id,
      { title, description, status },
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
