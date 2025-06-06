const express = require("express");
const {
    getTransactions,
    createTransaction,
    editTransaction,
    deleteTransaction,
} = require("../controllers/transactionController");

const router = express.Router();

router.get("/:start/:end", getTransactions);
router.post("/", createTransaction);
router.put("/:id", editTransaction);
router.delete("/:id", deleteTransaction);

module.exports = router;