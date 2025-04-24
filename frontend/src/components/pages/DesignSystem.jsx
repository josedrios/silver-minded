export default function DesignSystem() {
  return (
    <div>
      <DesignComponent title={"Typography"}>
        <h1>Heading 1</h1>
        <h2>Heading 2</h2>
        <h3>Heading 3</h3>
        <h4>Heading 4</h4>
        <h5>Heading 5</h5>
        <h6>Heading 6</h6>
        <p>Body</p>
      </DesignComponent>
      <DesignComponent title={"Color"}>
        <DesignColor color={"primary"} />
        <DesignColor color={"accent"} />
        <DesignColor color={"text"} />
        <DesignColor color={"border"} />
      </DesignComponent>
      <DesignComponent title={"Spacing"}>
        <div className="example-title-container">
          <div className="spacing-ex xs"></div>
          <p>xs</p>
        </div>
        <div className="example-title-container">
          <div className="spacing-ex sm"></div>
          <p>sm</p>
        </div>
        <div className="example-title-container">
          <div className="spacing-ex md"></div>
          <p>md</p>
        </div>
        <div className="example-title-container">
          <div className="spacing-ex lg"></div>
          <p>lg</p>
        </div>
        <div className="example-title-container">
          <div className="spacing-ex xl"></div>
          <p>xl</p>
        </div>
      </DesignComponent>
      <button className="test">UNFOCUSED</button>
      <button className="test2">FOCUSED</button>
    </div>
  );
}

function DesignComponent({ title, children }) {
  return (
    <div className="design-component">
      <h4 className="design-component-header">{title}</h4>
      {children}
    </div>
  );
}

function DesignColor({ color }) {
  return (
    <div className="design-color">
      <p>{color}</p>
      <div className="design-color-spectrum">
        {Array.from({ length: 8 }).map((_, i) => (
            <div className='color-block' 
            key={i} 
            style={{backgroundColor: `var(--${color}-${(i+1)*100})`, border: `${i === 4 ? '1px solid white' : ''}` }}/>
          ))}
      </div>
    </div>
  );
}