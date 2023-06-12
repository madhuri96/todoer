const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');
const users_controller = require('../controllers/userController');

router.post('/register', users_controller.register);
router.post('/login', users_controller.login);

// GET /api/todos
router.get('/', todoController.getTodos);

// GET /api/todos/:id
router.get('/:id', todoController.getTodoById);

// POST /api/todos
router.post('/', todoController.createTodo);

// PUT /api/todos/:id
router.put('/:id', todoController.updateTodo);

// DELETE /api/todos/:id
router.delete('/:id', todoController.deleteTodo);

module.exports = router;
