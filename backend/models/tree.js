const mongoose = require('mongoose');

const treeSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, default: 'Untitled' },
    categories: { type: [String], default: [] },
    isFavorite: { type: Boolean, default: false },
    lastViewedAt: { type: Date, default: null },
    content: { type: mongoose.Schema.Types.Mixed, default: null },
    readableContent: { type: String, default: '' },
  },
  { timestamps: true }
);

treeSchema.index({
  title: 'text',
  readableContent: 'text'
});

const Tree = mongoose.model('Tree', treeSchema);
module.exports = Tree;
