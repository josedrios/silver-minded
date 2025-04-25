export default function FinanceGraph({ data }) {
  const highestValue = Math.max(...data.map((d) => Number(d.value)));
  const increments = [0.75, 0.5, 0.25].map((p) =>
    (highestValue * p).toFixed(0)
  );

  console.log(data)

  return (
    <div id="finance-graph">
      <div id="finance-graph-x">
        <>
          {increments.map((val, key) => {
            return <FinanceGraphX key={key} value={val} />;
          })}
          <FinanceGraphX hide={true} />
        </>
      </div>
      <div id="finance-graph-right">
        <div id="finance-graph-body">
          {highestValue !== 0 ? (
            data.map((curr, key) => (
              <FinanceGraphBar
                key={key}
                height={(curr.value / highestValue) * 100}
                classLabel={curr.title}
              />
            ))
          ) : (
            ''
          )}
        </div>
        <div id="finance-graph-y">
          {data.map((curr, key) => (
            <FinanceGraphY key={key} label={curr.title}/>
          ))}
        </div>
      </div>
    </div>
  );
}

function FinanceGraphBar({ height, classLabel }) {
  return <div className={`finance-graph-bar ${classLabel}`} style={{ height: height + "%" }} />;
}

function FinanceGraphX({ value, hide }) {
  if (hide) {
    return <div className="increment"></div>;
  }
  return (
    <div className="increment">
      <p className="increment-title">${value}</p>
      <div className="increment-notch" />
    </div>
  );
}

function FinanceGraphY({ label }) {
  return (
    <div className="increment">
      <p className="increment-title">{label ? label : "-"}</p>
      <div className="increment-notch" />
    </div>
  );
}
