const express = require("express");
const {
    getTransactions,
    createTransaction,
    editTransaction,
    deleteTransaction,
    getFinanceOveralls
} = require("../controllers/transactionController");

const router = express.Router();

router.post("/", createTransaction);
router.put("/:id", editTransaction);
router.delete("/:id", deleteTransaction);
router.get("/:year/:month", getTransactions);
router.get("/stats", getFinanceOveralls);

module.exports = router;