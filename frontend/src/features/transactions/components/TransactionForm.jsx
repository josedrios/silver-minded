import {
  TextField,
  SlideToggleText,
  Button,
  TrashIcon,
} from '../../../components';
import { deleteTransaction, fetchAndUpdateTransactions, formValidation } from '../';

export default function TransactionForm({
  transactionForm,
  setTransactionForm,
  transactions,
  setTransactions,
  selectedTransaction,
  setSelectedTransaction,
  setTransactionModal
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
    <form
      className="transaction-form"
      onSubmit={(e) => {
        e.preventDefault();
        formValidation(
          transactionForm,
          setTransactionForm,
          transactions,
          setTransactions,
          selectedTransaction,
          setSelectedTransaction,
        );
      }}
    >
      <h5>{selectedTransaction === '' ? 'Create' : 'Edit'} Transaction</h5>
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
      <div className="transaction-form-btns">
        <Button type="submit" className="transaction-submit">
          {selectedTransaction === '' ? 'CREATE' : 'EDIT'}
        </Button>
        {selectedTransaction !== '' ? (
          <Button variant="error" squared={true} onClick={async() => {
            await deleteTransaction(selectedTransaction._id);
            fetchAndUpdateTransactions(transactions, setTransactions);
            setTransactionModal(false);
          }}>
            <TrashIcon />
          </Button>
        ) : (
          ''
        )}
      </div>
    </form>
  );
}
