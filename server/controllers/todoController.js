const { Todo, Subtask } = require('../models/todo');
const shortid = require('shortid');

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
    const { title, description, category, status } = req.body;
    const id = shortid.generate(); // Generate a unique id
    console.log(id);
    const todo = new Todo({ id, title, description, category, status });
    console.log(todo);
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
    const id = req.params.id;
    const nid = shortid.generate();
    const title = req.body.title;

    console.log(id);

    const todo = await Todo.findById(id);
    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    console.log(todo);
    const subtask = new Subtask({
      id: nid,
      title,
      todo: todo._id,
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
    const { id, subtaskId } = req.params;
    const { title } = req.body;

    const todo = await Todo.findById(id);
    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    const subtask = await Subtask.findOneAndUpdate(
      { _id: subtaskId, id: todo._id },
      { title },
      { new: true } // To return the updated subtask instead of the old one
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
    const { id, subtaskId } = req.params;

    console.log(req.params);

    console.log(id);
    console.log(subtaskId);

    const todo = await Todo.findById(id);
    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    const subtask = await Subtask.findByIdAndDelete(subtaskId);
    if (!subtask) {
      return res.status(404).json({ error: 'Subtask not found' });
    }

    // Perform any additional actions after successful deletion, such as updating the todo
    todo.subtasks.pull(subtask._id);
    await todo.save();

    res.json({ message: 'Subtask deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get all subtasks for a todo
exports.getSubtasks = async (req, res) => {
  try {
    const todoId = req.params.id;

    console.log(todoId);

    // Retrieve the todo by its ID
    const todo = await Todo.findById(todoId);
    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    // Fetch the subtasks associated with the todo
    const subtasks = await Subtask.find({ todo: todoId });
    console.log(subtasks);
    res.json(subtasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};
