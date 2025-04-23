import { IoIosAdd, IoMdTennisball } from "react-icons/io";
import { FaTableTennisPaddleBall } from "react-icons/fa6";

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
        <p>Body text is I, I am here as body text</p> 
      </DesignComponent>
      <DesignComponent title={"Color"}>
        <DesignColor color={"primary-color"} />
        <DesignColor color={"primary-hover-color"} />
        <DesignColor color={"primary-disabled-color"} />
        <DesignColor color={"accent-color"} />
        <DesignColor color={"accent-hover-color"} />
        <DesignColor color={"accent-disabled-color"} />
        <DesignColor color={"text-color"} />
        <DesignColor color={"text-hover-color"} />
        <DesignColor color={"text-disabled-color"} />
        <DesignColor color={"background-color"} />
        <DesignColor color={"container-color"} />
        <DesignColor color={"element-color"} />
        <DesignColor color={"border-color"} />
        <DesignColor color={"success-color"} />
        <DesignColor color={"warning-color"} />
        <DesignColor color={"error-color"} />
        <DesignColor color={"error-hover-color"} />
        <DesignColor color={"error-disabled-color"} />
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

      <DesignComponent>
        <div className="example-title-container">
          <button className="primary-btn">Primary</button>
          <p>Default</p>
        </div>
        <div className="example-title-container">
          <button className="primary-btn hover">Primary</button>
          <p>Hover</p>
        </div>
        <div className="example-title-container">
          <button className="primary-btn disabled">Primary</button>
          <p>Disabled</p>
        </div>

        <div className="example-title-container">
          <button className="accent-btn">Accent</button>
          <p>Default</p>
        </div>
        <div className="example-title-container">
          <button className="accent-btn hover">Accent</button>
          <p>Hover</p>
        </div>
        <div className="example-title-container">
          <button className="accent-btn disabled">Accent</button>
          <p>Disabled</p>
        </div>

        <div className="example-title-container">
          <button className="error-btn">Error</button>
          <p>Default</p>
        </div>
        <div className="example-title-container">
          <button className="error-btn hover">Error</button>
          <p>Hover</p>
        </div>
        <div className="example-title-container">
          <button className="error-btn disabled">Error</button>
          <p>Disabled</p>
        </div>

          <SquareButton icon={IoIosAdd} fontSize={24}/>
          <SquareButton icon={IoMdTennisball} fontSize={18}/>
          <SquareButton icon={FaTableTennisPaddleBall} fontSize={16}/>
      </DesignComponent>
      <DesignComponent title={"Text Fields"}>
        <input type="text" className="primary-input"/>
      </DesignComponent>
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
      <div className={`${color} color-block`} />
      <p>{color}</p>
    </div>
  );
}

function SquareButton({icon: Icon, fontSize}) {
  return (
    <button className="primary-square-btn">
      <Icon style={{fontSize: fontSize}}/>
    </button>
  )
}
