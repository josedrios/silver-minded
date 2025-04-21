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
    console.log(type)
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

    if (month !== "-1") {
      const m = Number(month); 

      const start = new Date(year, m, 1);
      const end = new Date(year, m + 1, 1);

      transactions = await Transaction.find({
        paidAt: { $gte: start, $lt: end },
      }).sort({ paidAt: -1 });
    } else if (month === "-1" && year === "-1")  {
      transactions = await Transaction.find().sort({ paidAt: -1 });
    }else {
      const start = new Date(year, 0, 1);
      const end = new Date(Number(year) + 1, 0, 1);

      transactions = await Transaction.find({
        paidAt: { $gte: start, $lt: end },
      }).sort({ paidAt: -1 });
    }
    console.log(transactions);
    res.json(transactions);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Error occurred while getting transactions",
      error: err.message,
    });
  }
};

exports.getFinanceOveralls = async (req, res) => {
  try {
    const result = await Transaction.aggregate([
      {
        $group: {
          _id: null,
          totalMade: {
            $sum: { $cond: [{ $eq: ["$category", "save"] }, "$amount", 0] }
          },
          totalSpent: {
            $sum: {
              $cond: [
                { $in: ["$category", ["need", "fun", "sub"]] },
                "$amount",
                0
              ]
            }
          }
        }
      }
    ]);

    const data = result[0] || { totalMade: 0, totalSpent: 0 };
    return res.status(200).json({
      totalMade: Number(data.totalMade).toFixed(2),
      totalSpent: Number(data.totalSpent).toFixed(2),
    })
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Error occurred while getting overall finance stats",
      error: err.message,
    });
  }
};

