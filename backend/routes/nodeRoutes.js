const express = require('express');
const { createNode } = require('../controllers/nodeController');

const router = express.Router();

router.post('/', createNode);

module.exports = router;
