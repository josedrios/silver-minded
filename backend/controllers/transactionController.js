const Transaction = require("../models/transaction");

exports.createTransaction = async (req, res) => {
  try {
    const { info, paidAt, type, amount, category } = req.body;
    const newTransaction = new Transaction({
      info,
      paidAt,
      type,
      amount,
      category,
    });
    await newTransaction.save();
    return res.status(201).json(newTransaction);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Error occurred while creating new transaction",
      error: err.message,
    });
  }
};

exports.editTransaction = async (req, res) => {
  try {
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Error occurred while editing transaction",
      error: err.message,
    });
  }
};

exports.deleteTransaction = async (req, res) => {
  try {
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Error occurred while deleting transaction",
      error: err.message,
    });
  }
};

exports.getTransactions = async (req, res) => {
  try {
    const { year, month } = req.params;
    let transactions;

    if (month !== -1) {
      const m = Number(month); 

      const start = new Date(year, m, 1);
      const end = new Date(year, m + 1, 1);

      transactions = await Transaction.find({
        paidAt: { $gte: start, $lt: end },
      }).sort({ paidAt: 1 });
    } else {
      const start = new Date(year, 0, 1);
      const end = new Date(Number(year) + 1, 0, 1);

      transactions = await Transaction.find({
        paidAt: { $gte: start, $lt: end },
      }).sort({ paidAt: 1 });
    }
    console.log('='.repeat(20));
    console.log(transactions)
    console.log('='.repeat(20));
    res.json(transactions);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Error occurred while getting transactions",
      error: err.message,
    });
  }
};
