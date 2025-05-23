const Tree = require('../models/tree');
const Node = require('../models/node');

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

exports.getTreeChildren = async (req, res) => {
  try {
    const { id } = req.params;
    const tree = await Tree.findById(id);
    if (!tree) return res.status(404).json({ message: 'Tree not found' });

    const orderedItems = [];
    const newOrder = [];

    for (const { type, id } of tree.order) {
      const Model = type === 'tree' ? Tree : Node;
      const doc = await Model.findById(id);
      if (doc) {
        orderedItems.push({ ...doc.toObject(), type });
        newOrder.push({ type, id });
      }
    }

    const cleanOrder = (order) =>
      order.map(({ type, id }) => ({ type, id: id.toString() }));

    const orderChanged =
      JSON.stringify(cleanOrder(tree.order)) !==
      JSON.stringify(cleanOrder(newOrder));
    if (orderChanged) {
      console.log(tree.order);
      console.log(newOrder);
      console.log('UPDATED TREE');
      tree.order = newOrder;
      await tree.save();
    }

    return res.status(200).json(orderedItems);
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: 'Error occurred while fetching children of tree',
      error: err.message,
    });
  }
};

exports.deleteTree = async (req, res) => {
  try {
    await deleteTreeRecursive(req.params.id);
    return res.status(200).json({ message: 'Tree deleted' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: 'Error occurred while deleting tree',
      error: err.message,
    });
  }
};

async function deleteTreeRecursive(id) {
  const tree = await Tree.findById(id);
  if (!tree) throw new Error('Tree not found');

  for (const { type, id: childId } of tree.order) {
    const Model = type === 'tree' ? Tree : Node;
    const child = await Model.findById(childId);
    if (child) {
      if (type === 'tree') {
        await deleteTreeRecursive(childId);
      } else {
        await child.deleteOne();
      }
    }
  }

  await Tree.deleteOne({ _id: id });
}

exports.updateTree = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body.changes;

    console.log(updates);

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
    console.log(q)

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