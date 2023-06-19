const mongoose = require('mongoose');

const subtaskSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  todoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Todo',
    required: true,
  },
});

const SubTask = mongoose.model('SubTask', subtaskSchema);

module.exports = SubTask;
