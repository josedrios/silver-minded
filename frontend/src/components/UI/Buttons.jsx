import React from 'react';
import PropTypes from 'prop-types';

const Button = ({
  children,
  onClick,
  variant = 'primary',
  disabled = false,
  className = '',
  squared = false
}) => {
  return (
    <button
      className={`btn ${variant} ${disabled ? 'disabled' : ''} ${squared ? 'squared' : ''} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  variant: PropTypes.oneOf(['primary', 'accent', 'gray', 'error']),
  disabled: PropTypes.bool,
  className: PropTypes.string,
};

export default Button;
