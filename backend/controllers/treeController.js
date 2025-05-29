const Tree = require('../models/tree');

exports.createTree = async (req, res) => {
  try {
    const parentId = req.body.parentId;
    const newTree = new Tree({ parentId });
    await newTree.save();
    return res.status(201).json(newTree._id);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: 'Error occurred while creating new tree',
      error: err.message,
    });
  }
};

exports.getTree = async (req, res) => {
  try {
    const { id } = req.params;

    const fetchedTree = await Tree.findById(id);

    if (!fetchedTree) {
      return res.status(404).json({ message: 'Tree not found' });
    }

    fetchedTree.lastViewedAt = new Date();
    await fetchedTree.save();

    return res.status(200).json(fetchedTree);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: 'Error occurred while fetching tree',
      error: err.message,
    });
  }
};

exports.deleteTree = async (req, res) => {
  try {
    await Tree.findByIdAndDelete(req.params.id)
    return res.status(200).json({ message: 'Tree deleted' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: 'Error occurred while deleting tree',
      error: err.message,
    });
  }
};

exports.updateTree = async (req, res) => {
  console.log('tree updated');
  try {
    const { id } = req.params;
    const updates = req.body.changes;

    const tree = await Tree.findById(id);
    if (!tree) return res.status(404).send('Tree not found');

    for (let key in updates) {
      if (tree[key] !== undefined && updates[key] !== undefined) {
        tree[key] = updates[key];
      }
    }

    await tree.save();
    return res.status(200).json(tree);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: 'Error occurred while editing tree',
      error: err.message,
    });
  }
};

exports.getFavoriteTrees = async (req, res) => {
  try {
    const fetchedTrees = await Tree.find({ isFavorite: true }).sort({
      lastViewedAt: -1,
    });
    return res.status(200).json(fetchedTrees);
  } catch (error) {
    console.log(err);
    return res.status(500).json({
      message: 'Error occurred while fetching favorite trees',
      error: err.message,
    });
  }
};

exports.getRecentTrees = async (req, res) => {
  try {
    const fetchedTrees = await Tree.find().sort({ lastViewedAt: -1 });
    return res.status(200).json(fetchedTrees);
  } catch (error) {
    console.log(err);
    return res.status(500).json({
      message: 'Error occurred while fetching recent trees',
      error: err.message,
    });
  }
};

exports.getSearchedTrees = async (req, res) => {
  try {
    const { q } = req.query;
    console.log(q);

    const fetchedTrees = await Tree.find(
      { $text: { $search: q } },
      { score: { $meta: 'textScore' } }
    ).sort({ score: { $meta: 'textScore' } });

    return res.status(200).json(fetchedTrees);
  } catch (error) {
    console.log(err);
    return res.status(500).json({
      message: 'Error occurred while fetching for searched trees',
      error: err.message,
    });
  }
};

// TEMP FOR DEV
exports.getAllTrees = async (req, res) => {
  try {
    const fetchedTrees = await Tree.find().sort({ lastViewedAt: -1 });
    return res.status(200).json(fetchedTrees);
  } catch (error) {
    console.log(err);
    return res.status(500).json({
      message: 'Error occurred while fetching trees',
      error: err.message,
    });
  }
};

exports.editContent = async (req, res) => {
  try {
    const { content } = req.body;
    const tree = await Tree.findByIdAndUpdate(
      req.params.id,
      { content },
      { new: true }
    );
    return res.status(201).json(tree);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: 'Error occurred while editing tree content',
      error: err.message,
    });
  }
};
