import { Button, ChevronLeft, ChevronRight } from '../../../components';
import { changeMonth, getMonthName } from '../../events';

export default function TimeFrame({transactions, setTransactions}) {
  return (
    <div className="bank-time-frame">
      <Button className="borderless" squared={true} variant='gray' onClick={() => changeMonth(setTransactions, false)}>
        <ChevronLeft />
      </Button>
      <h5 className='current-month'>{getMonthName(transactions.month).toUpperCase()}{' '}{transactions.year}</h5>
      <Button className="borderless" squared={true} variant='gray' onClick={() => changeMonth(setTransactions, true)}>
        <ChevronRight />
      </Button>
    </div>
  );
}
