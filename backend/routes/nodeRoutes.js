const express = require('express');
const { createNode, editContent, deleteNode, editTitle } = require('../controllers/nodeController');

const router = express.Router();

router.post('/', createNode);
router.delete('/:id', deleteNode);
router.put('/:id/content', editContent);
router.put('/:id/title', editTitle)

module.exports = router;
