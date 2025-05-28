const express = require('express');
const {
  createTree,
  getTree,
  deleteTree,
  updateTree,
  getAllTrees,
  getFavoriteTrees,
  getRecentTrees,
  getSearchedTrees,
  editContent,
} = require('../controllers/treeController');
const router = express.Router();

router.post('/', createTree);
router.get('/all', getAllTrees);
router.get('/favorites', getFavoriteTrees);
router.get('/recents', getRecentTrees);
router.get('/search', getSearchedTrees);
router.get('/:id', getTree);
router.delete('/:id', deleteTree);
router.patch('/:id', updateTree);
router.patch('/content/:id', editContent);

module.exports = router;