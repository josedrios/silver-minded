import { IoIosAdd, IoMdTennisball } from "react-icons/io";
import { FaTableTennisPaddleBall } from "react-icons/fa6";
import { useState, useEffect } from "react";

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

      <DesignComponent title={"Buttons"}>
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

        <SquareButton icon={IoIosAdd} fontSize={24} color={"primary-color"} />
        <SquareButton
          icon={IoMdTennisball}
          fontSize={18}
          color={"error-color"}
        />
        <SquareButton
          icon={FaTableTennisPaddleBall}
          fontSize={16}
          color={"accent-color"}
        />
      </DesignComponent>
      <DesignComponent title={"Text Fields"}>
        <TextField
          label={"Label"}
          beforeText={"CREATE/"}
          placeHolder={"IDEA"}
          color={"primary-color"}
        />
        <TextField
          beforeIcon={IoIosAdd}
          beforeIconFontSize={21}
          placeHolder={"Placeholder"}
          color={"primary-color"}
          afterIcon={IoIosAdd}
          afterIconFontSize={21}
        />
        <TextField
          placeHolder={"Placeholder"}
          color={"error-color"}
        />
      </DesignComponent>
      <DesignComponent title={"Links/Tabs"}>
        <a href="">Regular Link</a>
        <button className="tab-label">Tab</button>
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

function SquareButton({ icon: Icon, fontSize, color }) {
  return (
    <button className={`square-btn ${color}`}>
      <Icon style={{ fontSize: fontSize }} />
    </button>
  );
}

function TextField({
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