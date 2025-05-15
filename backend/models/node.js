const mongoose = require('mongoose');

const nodeSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, default: 'Untitled' },
    note: { type: String, default: '' },
    isFavorite: { type: Boolean, default: false },
    content: {
      type: {
        type: String,
        required: true,
      },
      data: mongoose.Schema.Types.Mixed,
    },
    parentId: { type: mongoose.Schema.ObjectId, ref: 'Tree', default: null },
  },
  { timestamps: true }
);

const Node = mongoose.model('Node', nodeSchema);
module.exports = Node;  