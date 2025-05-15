const Node = require('../models/node');

exports.createNode = async (req,res) => {
    try {
    const parentId = req.body.parentId;
    const newNode = new Node({ parentId });
    await newNode.save();
    return res.status(201).json(newNode._id);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: 'Error occurred while creating new node',
      error: err.message,
    });
  }
}