const express = require('express');
const {
  createTree,
  getTree,
  deleteTree,
  updateTree,
  getAllTrees,
  updateTreeOrder,
  getTreeChildren,
  getFavoriteTrees,
  getRecentTrees,
  getSearchedTrees,
} = require('../controllers/treeController');
const router = express.Router();

router.post('/', createTree);
router.get('/all', getAllTrees);
router.get('/favorites', getFavoriteTrees);
router.get('/recents', getRecentTrees);
router.get('/search', getSearchedTrees)
router.get('/:id', getTree);
router.get('/children/:id', getTreeChildren);
router.delete('/:id', deleteTree);
router.patch('/:id', updateTree);
router.patch('/order/:treeId', updateTreeOrder);

module.exports = router;