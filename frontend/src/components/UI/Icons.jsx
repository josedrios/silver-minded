import { LuBrainCircuit, LuPlus, LuBrain, LuTrash, LuSearch, LuPen } from 'react-icons/lu';

// EACH ICON USES DIFFERENT SIZES
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
