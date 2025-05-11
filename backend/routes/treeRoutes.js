const express = require('express');
const {
  createTree,
  getTree,
  deleteTree,
  updateTree,
} = require('../controllers/treeController');
const router = express.Router();

router.post('/', createTree);
router.get('/:id', getTree);
// router.get('/favorites or recents or etc', getGeneralTrees);
router.delete('/:id', deleteTree);
router.patch('/:id', updateTree);

module.exports = router;
