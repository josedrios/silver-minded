// lucideIcons.js
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
  LuWallet,
  LuBox,
  LuBoxes,
  LuEllipsisVertical,
  LuFileBox,
  LuFilePen
} from 'react-icons/lu';

const lucideSizes = { sm: 18, md: 24, lg: 36 };

// Helper function to generate icon components
const createIcon = (IconComponent) => ({ size = 'sm', className = '' }) => (
  <IconComponent size={lucideSizes[size]} className={className} />
);

// All icon exports
export const PlusIcon = createIcon(LuPlus);
export const BrainIcon = createIcon(LuBrain);
export const BrainCircuitIcon = createIcon(LuBrainCircuit);
export const TrashIcon = createIcon(LuTrash);
export const SearchIcon = createIcon(LuSearch);
export const PenIcon = createIcon(LuPen);
export const FilterIcon = createIcon(LuListFilter);
export const CheckmarkIcon = createIcon(LuCheck);
export const PauseIcon = createIcon(LuPause);
export const HourglassIcon = createIcon(LuHourglass);
export const DangerIcon = createIcon(LuTriangleAlert);
export const ArrowLeftIcon = createIcon(LuArrowLeft);
export const ArrowRightIcon = createIcon(LuArrowRight);
export const ChevronLeft = createIcon(LuChevronLeft);
export const ChevronRight = createIcon(LuChevronRight);
export const WalletIcon = createIcon(LuWallet);
export const BoxIcon = createIcon(LuBox);
export const BoxesIcon = createIcon(LuBoxes);
export const FileBoxIcon = createIcon(LuFileBox);
export const FilePenIcon = createIcon(LuFilePen);
export const VerticalEllipsisIcon = createIcon(LuEllipsisVertical)

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
