import { useState, useEffect } from "react";

export function TextField({
  beforeIcon: BeforeIcon,
  beforeIconFontSize,
  afterIcon: AfterIcon,
  afterIconFontSize,
  beforeText,
  label,
  placeHolder,
  color,
}) {
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    console.log(isFocused)
  }, [isFocused])

  return (
    <div className={`text-field ${color}`}>
      <label htmlFor="">{label}</label>
      <div className={`text-input-field ${isFocused ? 'focused' : ''}`}>
        {BeforeIcon ? (
          <BeforeIcon style={{ fontSize: beforeIconFontSize }} />
        ) : (
          ""
        )}
        {beforeText ? <p className="before-text">{beforeText}</p> : ""}
        <input
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          type="text"
          placeholder={placeHolder}
        />
        {AfterIcon ? <AfterIcon style={{ fontSize: afterIconFontSize }} /> : ""}
      </div>
    </div>
  );
}
