const mongoose = require('mongoose');

const nodeSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, default: 'Untitled' },
    content: {
      type: {
        type: String,
        required: true,
        default: 'none',
      },
      data: {type: mongoose.Schema.Types.Mixed, default: null},
    },
    parentId: {
      type: mongoose.Schema.ObjectId,
      ref: 'Tree',
      required: true,
      default: null,
    },
  },
  { timestamps: true }
);

const Node = mongoose.model('Node', nodeSchema);
module.exports = Node;