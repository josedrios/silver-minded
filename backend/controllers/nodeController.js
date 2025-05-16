const Node = require('../models/node');

exports.createNode = async (req, res) => {
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
};

exports.editContent = async (req, res) => {
  try {
    console.log(req.body)
    const { content } = req.body;
    console.log(content.data);
    const node = await Node.findByIdAndUpdate(
      req.params.id,
      { content },
      { new: true }
    );
    console.log(node);
    return res.status(201).json(node);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: 'Error occurred while editing node content',
      error: err.message,
    });
  }
};
