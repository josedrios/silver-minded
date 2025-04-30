import { useRef, useEffect, useState, useMemo } from 'react';

export const SlideToggle = ({ toggleState, setToggleState, variant }) => {
  return (
    <div
      className="slide-toggle"
      onClick={() => setToggleState((prev) => !prev)}
    >
      <div className={toggleState ? `on ${variant}` : ''} />
    </div>
  );
};

export const SlideToggleText = ({
  toggleState,
  setToggleState,
  options,
  variant,
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
    return 5 + totalWidth + prevOptions.length * 10;
  }, [toggleState, options, pWidths]);

  return (
    <div className="slide-toggle-text">
      {options.map((word) => (
        <p
          key={word}
          ref={(el) => (pRefs.current[word] = el)}
          onClick={() => setToggleState(word)}
        >
          {word.toUpperCase()}
        </p>
      ))}
      <div
        style={{
          left: `${leftOffset}px`,
          width: `${pWidths[toggleState]}px`,
        }}
      />
    </div>
  );
};
