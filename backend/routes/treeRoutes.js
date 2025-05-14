const express = require('express');
const {
  createTree,
  getTree,
  deleteTree,
  updateTree,
  getAllTrees,
  updateTreeOrder,
  getTreeChildren,
} = require('../controllers/treeController');
const router = express.Router();

router.post('/', createTree);
router.get('/all', getAllTrees);
router.get('/:id', getTree);
router.get('/children/:id', getTreeChildren);
router.delete('/:id', deleteTree);
router.patch('/:id', updateTree);
router.patch('/order/:treeId', updateTreeOrder);

module.exports = router;