import PropTypes from 'prop-types';
import React, { useState } from 'react';

const TextField = ({
  label,
  value,
  onChange,
  placeholder = '',
  type = 'text',
  variant = 'primary',
  disabled = false,
  className = '',
  name = '',
  beforeText,
  beforeIcon: BeforeIcon,
  afterIcon: AfterIcon,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className={`text-field ${className}`}>
      {label && <label htmlFor={name || undefined}>{label}</label>}
      <div className={`input-section ${variant} ${isFocused ? 'focused' : ''}`}>
        {BeforeIcon && <BeforeIcon />}
        {beforeText && beforeText}
        <input
          id={name || undefined}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          className="input"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        {AfterIcon && <AfterIcon />}
      </div>
    </div>
  );
};

TextField.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  variant: PropTypes.oneOf(['primary', 'accent', 'gray', 'error']),
  disabled: PropTypes.bool,
  className: PropTypes.string,
  name: PropTypes.string,
};

export default TextField;
