import { IoIosAdd } from 'react-icons/io';
import { LuBrain } from 'react-icons/lu';
import { LuBrainCircuit } from 'react-icons/lu';
import { FaRegTrashAlt } from "react-icons/fa";
import { FaRegCalendar } from 'react-icons/fa6';

// USE DIFFERENT SIZES, FOR EXAMPLE:
// const plusSizes = { sm: 20, md: 24, lg: 32 };
// const brainSizes = { sm: 16, md: 20, lg: 28 };
// const trashSizes = { sm: 14, md: 18, lg: 24 };

// export const PlusIcon = ({ size = 'md', className = '' }) => (
//     <IoIosAdd size={plusSizes[size]} className={className} />
//   );

export const PlusIcon = ({ size = 24, className = '' }) => (
    <IoIosAdd size={size} className={className} />
);

export const BrainIcon = ({ size = 18, className = '' }) => (
  <LuBrain size={size} className={className} />
);

export const BrainCircuitIcon = ({ size = 18, className = '' }) => (
  <LuBrainCircuit size={size} className={className} />
);

export const TrashIcon = ({ size = 16, className = '' }) => (
  <FaRegTrashAlt size={size} className={className} />
);

export const CalendarIcon = ({ size = 16, className = '' }) => (
    <FaRegCalendar size={size} className={className} />
  );

export const Icon = ({
  children,
  variant = 'primary',
  className = '',
  type = 'fill',
}) => {
  return (
    <div className={`icon ${variant} ${className} ${type}`}>{children}</div>
  );
};
