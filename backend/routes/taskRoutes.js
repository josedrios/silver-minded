const express = require('express');
const { createTask, editTask, getTasks, deleteTask } = require('../controllers/routeController');

const router = express.Router();

router.get('/', getTasks);
router.post('/', createTask);
router.patch('/:id', editTask);
router.delete('/:id', deleteTask);

module.exports = router;