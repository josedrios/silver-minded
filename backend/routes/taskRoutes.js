const express = require('express');
const { createTask, editTask, getTasks, deleteTask, statusUpdateTask } = require('../controllers/routeController');

const router = express.Router();

router.get('/', getTasks);
router.post('/', createTask);
router.patch('/:id', editTask);
router.patch('/status/:id', statusUpdateTask);
router.delete('/:id', deleteTask);

module.exports = router;