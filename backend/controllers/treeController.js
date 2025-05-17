const Tree = require('../models/tree');
const Node = require('../models/node')

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

    return res.status(200).json(fetchedTree);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: 'Error occurred while fetching tree',
      error: err.message,
    });
  }
};

exports.getTreeChildren = async (req, res) => {
  try {
    const { id } = req.params;

    const tree = await Tree.findById(id);
    if (!tree) {
      return res.status(404).json({ message: 'Tree not found' });
    }

    const orderedItems = [];
    const newOrder = [];

    for (const { type, id } of tree.order) {
      const Model = type === 'tree' ? Tree : Node;
      const doc = await Model.findById(id);
      if (doc) {
        const itemWithType = { ...doc.toObject(), type }; 
        orderedItems.push(itemWithType);
        newOrder.push({ type, id });
      }
    }

    tree.order = newOrder;

    await tree.save();
    return res.status(200).json(orderedItems);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: 'Error occurred while fetching children of tree',
      error: err.message,
    });
  }
};

exports.deleteTree = async (req, res) => {};

exports.updateTree = async (req, res) => {
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

exports.updateTreeOrder = async (req, res) => {
  try {
    const { treeId } = req.params;
    const { childId, referenceId, type } = req.body;

    const tree = await Tree.findById(treeId);
    if (!tree) return res.status(404).send('Tree not found');

    tree.order = tree.order.filter((child) => child.id.toString() !== childId);

    if (!referenceId) {
      tree.order.push({
        type: type,
        id: childId,
      });
    } else {
      const refIndex = tree.order.findIndex(
        (tree) => tree.id.toString() === referenceId
      );
      if (refIndex === -1)
        return res
          .status(400)
          .json({ message: 'Reference ID not found in order' });

      tree.order.splice(refIndex, 0, { type: type, id: childId });
    }

    await tree.save();
    return res.status(200).json(tree.order);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: 'Error occurred while editing tree order',
      error: err.message,
    });
  }
};

// TEMP FOR DEV
exports.getAllTrees = async (req, res) => {
  try {
    const fetchedTrees = await Tree.find().sort({ updatedAt: -1 });
    return res.status(200).json(fetchedTrees);
  } catch (error) {
    console.log(err);
    return res.status(500).json({
      message: 'Error occurred while fetching trees',
      error: err.message,
    });
  }
};
