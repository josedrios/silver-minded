import React, { useState } from 'react';
import { motion } from 'motion/react';

const list = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.07,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: -15 },
  visible: { opacity: 1, y: 0, transition: { type: 'tween', duration: 0.2 } },
};

const IconDropdown = ({ icons, options, value, onChange, variant }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (selectedValue) => {
    onChange(selectedValue);
    setIsOpen(false);
  };

  const getSelectedIcon = (selectedValue) => {
    const index = options.indexOf(selectedValue);
    return index !== -1
      ? React.createElement(icons[index + 1])
      : React.createElement(icons[0]);
  };

  return (
    <div className={`simple-select ${variant}`}>
      <div className="select-wrapper">
        <div
          className={`select-box ${variant}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          {getSelectedIcon(value)}{' '}
        </div>
        {isOpen && (
          <motion.ul
            className="options-list"
            initial="hidden"
            animate="visible"
            variants={list}
            exit="hidden"
          >
            <motion.li
              variants={item}
              key="default"
              className={`option ${variant}`}
              onClick={() => handleSelect('')}
            >
              {React.createElement(icons[0])}
            </motion.li>
            {options.map((option, index) => (
              <motion.li
                variants={item}
                key={option}
                className={`option ${variant}`}
                onClick={() => handleSelect(option)}
              >
                {React.createElement(icons[index + 1])}
              </motion.li>
            ))}
          </motion.ul>
        )}
      </div>
    </div>
  );
};

export default IconDropdown;
