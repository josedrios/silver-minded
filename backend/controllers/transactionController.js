const Transaction = require("../models/transaction");

exports.createTransaction = async (req, res) => {
  try {
    
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
    
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Error occurred while getting transactions",
      error: err.message,
    });
  }
};