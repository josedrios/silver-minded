const Tree = require('../models/tree');

exports.createTree = async (req, res) => {
  try {
    const newTree = new Tree();
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

exports.getTree = async (req, red) => {};

exports.deleteTree = async (req, res) => {};

exports.updateTree = async (req, res) => {};
