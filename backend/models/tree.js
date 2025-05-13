const mongoose = require('mongoose');

const treeSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, default: 'Untitled' },
    note: { type: String, default: '' },
    categories: { type: [String], default: [] },
    isFavorite: { type: Boolean, default: false },
    order: { type: [mongoose.Schema.ObjectId], default: [] },
    parentId: { type: mongoose.Schema.ObjectId, ref: 'Tree', default: null },
  },
  { timestamps: true }
);

const Tree = mongoose.model('Tree', treeSchema);
module.exports = Tree;
