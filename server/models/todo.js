const mongoose = require('mongoose');

const statusEnum = ['in-progress', 'on-hold', 'complete'];

const subtaskSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    //unique: true,
  },
  title: {
    type: String,
    required: true,
  },

  todo: { type: mongoose.Schema.Types.ObjectId, ref: 'Todo' },
});

const Subtask = mongoose.model('Subtask', subtaskSchema);

const todoSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  category: {
    type: String,
    require: true,
  },
  status: {
    type: String,
    enum: statusEnum,
    default: 'in-progress',
  },

  subtasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Subtask' }],
});

const Todo = mongoose.model('Todo', todoSchema);

module.exports = { Todo, Subtask };
