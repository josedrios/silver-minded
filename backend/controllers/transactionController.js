const Transaction = require('../models/transaction');

exports.createTransaction = async (req, res) => {
  try {
    const { transaction } = req.body;
    const newTransaction = new Transaction({
      info: transaction.info,
      category: transaction.category,
      amount: transaction.amount,
    });
    await newTransaction.save();
    return res.status(201).json(newTransaction);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: 'Error occurred while creating new transaction',
      error: err.message,
    });
  }
};

exports.editTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const { transaction } = req.body;

    const updated = await Transaction.findByIdAndUpdate(
      id,
      {
        info: transaction.info,
        amount: transaction.amount,
        category: transaction.category,
      },
      { new: true, runValidators: true }
    );

    if (!updated) return res.status(404).json({ message: 'Event not found' });
    res.status(200).json(updated);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: 'Error occurred while editing transaction',
      error: err.message,
    });
  }
};

exports.deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Transaction.findByIdAndDelete(id);
    if (!deleted)
      return res.status(404).json({ message: 'Transaction not found' });
    res.json({ message: 'Transaction deleted' });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: 'Error occurred while deleting transaction',
      error: err.message,
    });
  }
};

exports.getTransactions = async (req, res) => {
  try {
    const { start, end } = req.params;

    const startDate = new Date(start);
    const endDate = new Date(end);
    const currentMonth = startDate.getUTCMonth() + 1;

    console.log(startDate, endDate, currentMonth);

    const transactions = await Transaction.find({
      $and: [{ createdAt: { $gte: startDate, $lte: endDate } }],
    }).sort({ createdAt: -1 });

    console.log(transactions);

    res.json(transactions);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: 'Error occurred while getting transactions',
      error: err.message,
    });
  }
};
