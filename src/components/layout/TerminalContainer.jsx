import { Children } from "react";

export default function TerminalContainer({
  id,
  children,
  labels,
  controllers,
  color,
}) {
  return (
    <div
      id={id}
      className="terminal-container"
      style={{ border: "1px solid greenyellow" }}
    >
      {labels && (
        <div className="label-container">
          {labels.map((label, key) => (
            <h5
              key={key}
              style={{
                borderLeft: `1px solid ${color}`,
                borderRight: `1px solid ${color}`,
              }}
            >
              {label}
            </h5>
          ))}
        </div>
      )}
      {children}
      {controllers && (
        <div className="controller-container">
          {controllers.map((control, key) => (
            <button
              key={key}
              style={{
                borderLeft: `1px solid ${color}`,
                borderRight: `1px solid ${color}`,
              }}
            >
              {control}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
