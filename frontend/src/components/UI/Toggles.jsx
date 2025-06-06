import { useRef, useEffect, useState, useMemo } from 'react';

export const SlideToggle = ({
  toggleState,
  setToggleState,
  variant,
  label,
}) => {
  return (
    <div className="slide-toggle-container">
      {label && <label htmlFor={undefined}>{label}</label>}
      <div
        className="slide-toggle"
        onClick={() => setToggleState((prev) => !prev)}
      >
        <div className={toggleState ? `on ${variant}` : ''} />
      </div>
    </div>
  );
};

export const SlideToggleText = ({
  toggleState,
  setToggleState,
  options,
  variant,
  label
}) => {
  const pRefs = useRef({});
  const [pWidths, setPWidths] = useState({});

  useEffect(() => {
    const widths = {};
    options.forEach((option) => {
      const el = pRefs.current[option];
      widths[option] = el ? el.offsetWidth : 0;
    });
    setPWidths(widths);
  }, [options]);

  const leftOffset = useMemo(() => {
    const index = options.indexOf(toggleState);
    if (index === -1 || !options.length) return 4;
    const prevOptions = options.slice(0, index);
    const totalWidth = prevOptions.reduce(
      (sum, key) => sum + (pWidths[key] || 0),
      0
    );
    return 4 + totalWidth + prevOptions.length * 9.5;
  }, [toggleState, options, pWidths]);

  return (
    <div className='slide-toggle-text-container'>
      {label && <label htmlFor={undefined}>{label}</label>}
      <div className="slide-toggle-text">
      {options.map((word) => (
        <p
          key={word}
          ref={(el) => (pRefs.current[word] = el)}
          onClick={() => setToggleState(word)}
          className={word === toggleState ? 'current' : ''}
        >
          {word.toUpperCase()}
        </p>
      ))}
      <div
        style={{
          left: `${leftOffset}px`,
          width: `${pWidths[toggleState]}px`,
        }}
        className={variant}
      />
    </div>
    </div>
  );
};
