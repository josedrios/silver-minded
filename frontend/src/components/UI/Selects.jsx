import Select from "react-select";

export const RowSelect = ({
  selectState,
  setSelectState,
  options,
  variant = 'primary',
  label,
}) => {
  const handleClick = (option) => {
    if (selectState.includes(option)) {
      setSelectState(selectState.filter((item) => item !== option));
    } else {
      setSelectState([...selectState, option]);
    }
  };

  return (
    <div className="row-select-container">
      {label && <label htmlFor={undefined}>{label}</label>}
      <div className="row-select">
        {options.map((option) => (
          <p
            onClick={() => handleClick(option)}
            className={`${variant} ${
              selectState.includes(option) ? 'active' : ''
            }`}
          >
            {option}
          </p>
        ))}
      </div>
    </div>
  );
};

export function MultiSelect() {
  const [inputValue, setInputValue] = React.useState('');
  const [selectedItems, setSelectedItems] = React.useState([]);

  const {
    getSelectedItemProps,
    getDropdownProps,
    addSelectedItem,
    removeSelectedItem
  } = useMultipleSelection({
    selectedItems,
    onSelectedItemsChange: ({ selectedItems }) =>
      setSelectedItems(selectedItems),
  });

  const {
    isOpen,
    getMenuProps,
    getInputProps,
    getItemProps,
    highlightedIndex,
  } = useCombobox({
    inputValue,
    onInputValueChange: ({ inputValue }) => setInputValue(inputValue),
    items: items.filter(
      item =>
        !selectedItems.includes(item) &&
        item.toLowerCase().startsWith(inputValue.toLowerCase())
    ),
    onSelectedItemChange: ({ selectedItem }) => {
      if (selectedItem) {
        addSelectedItem(selectedItem);
        setInputValue('');
      }
    },
  });

  return (
    <div>
      {selectedItems.map((item, index) => (
        <span key={`selected-item-${index}`} {...getSelectedItemProps({ selectedItem: item, index })}>
          {item}
          <button onClick={() => removeSelectedItem(item)}>x</button>
        </span>
      ))}
      <input {...getInputProps(getDropdownProps({ preventKeyAction: isOpen }))} />
      <ul {...getMenuProps()}>
        {isOpen &&
          items
            .filter(
              item =>
                !selectedItems.includes(item) &&
                item.toLowerCase().startsWith(inputValue.toLowerCase())
            )
            .map((item, index) => (
              <li
                key={`${item}${index}`}
                {...getItemProps({ item, index })}
                style={{
                  backgroundColor: highlightedIndex === index ? '#bde4ff' : 'white',
                }}
              >
                {item}
              </li>
            ))}
      </ul>
    </div>
  );
}

export function ReactMultiSelect ({ options ,value, onChange, placeholder = 'Select...', className }) {
  return (
    <Select
      isMulti
      options={options}
      value={value}
      onChange={onChange}
      className={className}
      classNamePrefix="custom-select"
      placeholder={placeholder}
    />
  )
};