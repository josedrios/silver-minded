import React from 'react';
import PropTypes from 'prop-types';

const Button = ({
  children,
  onClick,
  variant = 'primary',
  type = 'button',
  disabled = false,
  className = '',
  squared = false,
  ref
}) => {
  return (
    <button
      type={type}
      className={`btn ${variant} ${disabled ? 'disabled' : ''} ${
        squared ? 'squared' : ''
      } ${className}`}
      onClick={onClick}
      disabled={disabled}
      ref={ref}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  variant: PropTypes.oneOf(['primary', 'accent', 'gray', 'error']),
  disabled: PropTypes.bool,
  className: PropTypes.string,
};

export default Button;
