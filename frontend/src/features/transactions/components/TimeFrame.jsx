import { Button, ChevronLeft, ChevronRight } from '../../../components';

export default function TimeFrame() {
  return (
    <div className="bank-time-frame">
      <Button className="borderless" squared={true} variant='gray'>
        <ChevronLeft />
      </Button>
      <h5 className='current-month'>MAY</h5>
      <Button className="borderless" squared={true} variant='gray'>
        <ChevronRight />
      </Button>
    </div>
  );
}
