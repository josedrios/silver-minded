const express = require('express');
const { createNode, editContent, deleteNode } = require('../controllers/nodeController');

const router = express.Router();

router.post('/', createNode);
router.delete('/:id', deleteNode);
router.put('/:id/content', editContent);

module.exports = router;
