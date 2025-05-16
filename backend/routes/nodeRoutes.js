const express = require('express');
const { createNode, editContent } = require('../controllers/nodeController');

const router = express.Router();

router.post('/', createNode);
router.put('/:id/content', editContent);

module.exports = router;
