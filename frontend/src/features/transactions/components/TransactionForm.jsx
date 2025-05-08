import { TextField, SlideToggleText, Button } from '../../../components';

export default function TransactionForm({
  transactionForm,
  setTransactionForm,
}) {
  const handleTransactionInfo = (newValue) => {
    setTransactionForm((prev) => ({
      ...prev,
      info: newValue,
    }));
  };

  const handleTransactionAmount = (newValue) => {
    setTransactionForm((prev) => ({
      ...prev,
      amount: newValue,
    }));
  };

  const handleTransactionCategory = (newValue) => {
    setTransactionForm((prev) => ({
      ...prev,
      category: newValue,
    }));
  };

  return (
    <form className="transaction-form">
      <h5>Create Transaction</h5>
      <TextField
        value={transactionForm.info}
        label="Info"
        onChange={(e) => handleTransactionInfo(e.target.value)}
        placeholder="Enter transaction info..."
      />
      <SlideToggleText
        label="Category"
        toggleState={transactionForm.category}
        setToggleState={handleTransactionCategory}
        options={['need', 'save', 'sub', 'fun']}
        variant={'primary'}
      />
      <TextField
        value={transactionForm.amount}
        onChange={(e) => handleTransactionAmount(e.target.value)}
        label="Amount"
        beforeText="$"
        placeholder="00.00"
      />
      <Button type="submit" className="transaction-submit">
        CREATE
      </Button>
    </form>
  );
}
