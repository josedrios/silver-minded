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

exports.deleteNode = async (req, res) => {
  try {
    const { id } = req.params;

    const node = await Node.findByIdAndDelete(id);

    if (!node) {
      return res.status(404).json({ message: 'Node not found' });
    }

    return res.status(200).json({ message: 'Node was deleted' });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: 'Error occurred while deleting node',
      error: err.message,
    });
  }
};

exports.editContent = async (req, res) => {
  try {
    const { content } = req.body;
    const node = await Node.findByIdAndUpdate(
      req.params.id,
      { content },
      { new: true }
    );
    return res.status(201).json(node);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: 'Error occurred while editing node content',
      error: err.message,
    });
  }
};

exports.editTitle = async (req, res) => {
  try {
    const { id } = req.params;
    const { title } = req.body;

    const node = await Node.findByIdAndUpdate(id, { title }, { new: true });

    if (!node) {
      return res.status(404).json({ message: 'Node not found' });
    }

    return res.status(200).json({ message: 'Node title was edited' });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: 'Error occurred while editing node title',
      err: err.message,
    });
  }
};
