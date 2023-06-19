const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');
const users_controller = require('../controllers/userController');
const category_Controller = require('../controllers/categoryController');

// GET /api/categories
router.get('/categories', category_Controller.getCategories);

// POST /api/categories
router.post('/categories', category_Controller.createCategory);

// PUT /api/categories/:id
router.put('/categories/:id', category_Controller.updateCategory);

// DELETE /api/categories/:id
router.delete('/categories/:id', category_Controller.deleteCategory);

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

// POST /api/todos/:id/subtasks
router.post('/:id/subtasks', todoController.createSubTask);

// PUT /api/todos/:id/subtasks/:subtaskId
router.put('/:id/subtasks/:subtaskId', todoController.updateSubTask);

// DELETE /api/todos/:id/subtasks/:subtaskId
router.delete('/:id/subtasks/:subtaskId', todoController.deleteSubTask);

module.exports = router;
