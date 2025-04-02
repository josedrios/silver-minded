export function TerminalContainer({
  id,
  children,
  labels,
  controllers,
  functions,
  color,
  classname,
  divider,
}) {
  return (
    <div
      id={id}
      className={`terminal-container ${classname}`}
      style={{ border: `1px solid ${color}` }}
    >
      {labels && (
        <div className="label-container">
          {labels.map((label, key) => {
            const isDivider = divider?.[0] !== undefined && key === divider[0];
            return (
              <h5
                key={key}
                style={{
                  borderLeft: `1px solid ${color}`,
                  borderRight: `1px solid ${color}`,
                  ...(isDivider && { marginLeft: "auto" }),
                }}
              >
                {label}
              </h5>
            );
          })}
        </div>
      )}
      {children}
      {controllers && (
        <div className="controller-container">
          {controllers.map((control, key) => {
            const isDivider = divider?.[1] !== undefined && key === divider[1];
            return (
              <button
                key={key}
                style={{
                  borderLeft: `1px solid ${color}`,
                  borderRight: `1px solid ${color}`,
                  ...(isDivider && { marginLeft: "auto" }),
                }}
                onClick={control.function}
              >
                {control.name}
              </button>
            );
          })}
        </div>
      )} 
    </div>
  );
}

export function SubTerminalContainer({ classname, children, labels, color, divider }) {
  return (
    <div
    className={`subterminal-container ${classname}`}
    style={{ border: `1px solid ${color}` }}
    >
      {labels && (
        <div className="label-container">
          {labels.map((label, key) => {
            const isDivider = divider?.[0] !== undefined && key === divider[0];
            return (
              <h5
                key={key}
                style={{
                  borderLeft: `1px solid ${color}`,
                  borderRight: `1px solid ${color}`,
                  ...(isDivider && { marginLeft: "auto" }),
                }}
              >
                {label}
              </h5>
            );
          })}
        </div>
      )}
      {children}
    </div>
  );
}
