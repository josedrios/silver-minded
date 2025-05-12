const Tree = require('../models/tree');

exports.createTree = async (req, res) => {
  try {
    const newTree = new Tree();
    await newTree.save();
    console.log(newTree._id);
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

    console.log(fetchedTree);
    return res.status(200).json(fetchedTree);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: 'Error occurred while fetching tree',
      error: err.message,
    });
  }
};

exports.deleteTree = async (req, res) => {};

exports.updateTree = async (req, res) => {};

// TEMP FOR DEV
exports.getAllTrees = async (req, res) => {
  try {
    const fetchedTrees = await Tree.find();

    console.log(fetchedTrees);
    return res.status(200).json(fetchedTrees)
  } catch (error) {
    console.log(err);
    return res.status(500).json({
      message: 'Error occurred while fetching trees',
      error: err.message,
    });
  }
};
