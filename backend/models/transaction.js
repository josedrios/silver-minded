const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  info: { type: String, required: true },
  amount: { type: Number, required: true},
  category: {
    type: String,
    enum: ["save", "need", 'sub', 'fun'],
    default: "need",
    required: true,
  },
  type: { 
    type: String, 
    enum: ["debit", "credit"],
    default: "debit"
  },
  createdAt: { type: Date, default: Date.now },
  paidAt: { type: Date },
});

const Transaction = mongoose.model("Transaction", transactionSchema);
module.exports = Transaction;