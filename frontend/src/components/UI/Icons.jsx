import {
  LuBrainCircuit,
  LuPlus,
  LuBrain,
  LuTrash,
  LuSearch,
  LuPen,
  LuListFilter,
  LuCheck,
  LuPause,
  LuHourglass,
  LuTriangleAlert,
  LuArrowLeft,
  LuArrowRight,
  LuChevronLeft,
  LuChevronRight,
} from 'react-icons/lu';

// EACH ICON SET USES DIFFERENT SIZES
const lucideSizes = { sm: 18, md: 24, lg: 36 };

export const PlusIcon = ({ size = 'sm', className = '' }) => (
  <LuPlus size={lucideSizes[size]} className={className} />
);

export const BrainIcon = ({ size = 'sm', className = '' }) => (
  <LuBrain size={lucideSizes[size]} className={className} />
);

export const BrainCircuitIcon = ({ size = 'sm', className = '' }) => (
  <LuBrainCircuit size={lucideSizes[size]} className={className} />
);

export const TrashIcon = ({ size = 'sm', className = '' }) => (
  <LuTrash size={lucideSizes[size]} className={className} />
);

export const SearchIcon = ({ size = 'sm', className = '' }) => (
  <LuSearch size={lucideSizes[size]} className={className} />
);

export const PenIcon = ({ size = 'sm', className = '' }) => (
  <LuPen size={lucideSizes[size]} className={className} />
);

export const FilterIcon = ({ size = 'sm', className = '' }) => (
  <LuListFilter size={lucideSizes[size]} className={className} />
);

export const CheckmarkIcon = ({ size = 'sm', className = '' }) => (
  <LuCheck size={lucideSizes[size]} className={className} />
);

export const PauseIcon = ({ size = 'sm', className = '' }) => (
  <LuPause size={lucideSizes[size]} className={className} />
);

export const HourglassIcon = ({ size = 'sm', className = '' }) => (
  <LuHourglass size={lucideSizes[size]} className={className} />
);

export const DangerIcon = ({ size = 'sm', className = '' }) => (
  <LuTriangleAlert size={lucideSizes[size]} className={className} />
);

export const ArrowRightIcon = ({ size = 'sm', className = '' }) => (
  <LuArrowRight size={lucideSizes[size]} className={className} />
);

export const ArrowLeftIcon = ({ size = 'sm', className = '' }) => (
  <LuArrowLeft size={lucideSizes[size]} className={className} />
);

export const ChevronLeft = ({ size = 'sm', className = '' }) => (
  <LuChevronLeft size={lucideSizes[size]} className={className} />
);

export const ChevronRight = ({ size = 'sm', className = '' }) => (
  <LuChevronRight size={lucideSizes[size]} className={className} />
);

export const Icon = ({
  children,
  variant = 'primary',
  className = '',
  type = 'stroke',
  size = 'sm',
}) => {
  return (
    <div className={`icon ${variant} ${className} ${type} ${size}`}>
      {children}
    </div>
  );
};
