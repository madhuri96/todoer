const mongoose = require('mongoose');

const statusEnum = ['in-progress', 'on-hold', 'complete'];

const todoSchema = new mongoose.Schema({
  id: {
    type: Number,
    require: true,
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
  status: {
    type: String,
    enum: statusEnum,
    default: 'in-progress',
  },
});

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;
