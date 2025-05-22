const mongoose = require('mongoose');

const treeSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, default: 'Untitled' },
    note: { type: String, default: '' },
    categories: { type: [String], default: [] },
    isFavorite: { type: Boolean, default: false },
    lastViewedAt: { type: Date, default: null },
    order: [
      {
        type: { type: String, enum: ['tree', 'node'], required: true },
        id: { type: mongoose.Schema.ObjectId, required: true },
      },
    ],
    parentId: { type: mongoose.Schema.ObjectId, ref: 'Tree', default: null },
  },
  { timestamps: true }
);

const Tree = mongoose.model('Tree', treeSchema);
module.exports = Tree;
