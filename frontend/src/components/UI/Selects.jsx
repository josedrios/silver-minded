export const RowSelect = ({
  selectState,
  setSelectState,
  options,
  variant,
}) => {
  const handleClick = (option) => {
    if (selectState.includes(option)) {
      setSelectState(selectState.filter((item) => item !== option));
    } else {
      setSelectState([...selectState, option]);
    }
  };

  return (
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
  );
};
