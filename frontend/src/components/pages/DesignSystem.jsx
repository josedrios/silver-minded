import Button from '../UI/Button';
import {
  Icon,
  BrainIcon,
  PlusIcon,
  BrainCircuitIcon,
  TrashIcon,
  CalendarIcon
} from '../UI/Icons';

export default function DesignSystem() {
  return (
    <div>
      <DesignComponent title={'Icons'}>
        <p>Raw Icons</p>
        <div className="raw-icons">
          <PlusIcon />
          <BrainIcon />
          <BrainCircuitIcon />
          <TrashIcon />
          <CalendarIcon />
        </div>
        <p>Displayed Icons</p>{' '}
        <Icon variant="primary" type="fill">
          <PlusIcon />
        </Icon>
        <Icon variant="accent" type="stroke">
          <BrainCircuitIcon />
        </Icon>
        <Icon variant="border" type="stroke">
          <BrainIcon />
        </Icon>
      </DesignComponent>
      <DesignComponent title={'Color'}>
        <DesignColor color={'primary'} />
        <DesignColor color={'accent'} />
        <DesignColor color={'error'} />
        <DesignColor color={'text'} />
        <DesignColor color={'gray'} />
      </DesignComponent>
      <DesignComponent title={'Spacing'}>
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
      <DesignComponent title={'Buttons'}>
        <Button variant="primary" >
          PRIMARY
        </Button>
        <Button variant="accent">ACCENT</Button>
        <Button variant="gray">GRAY</Button>
        <Button variant="error">ERROR</Button>
      </DesignComponent>
      <DesignComponent title={'Typography'}>
        <h1>Heading 1</h1>
        <h2>Heading 2</h2>
        <h3>Heading 3</h3>
        <h4>Heading 4</h4>
        <h5>Heading 5</h5>
        <h6>Heading 6</h6>
        <p>Body</p>
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
      <p>{color}</p>
      <div className="design-color-spectrum">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            className="color-block"
            key={i}
            style={{
              backgroundColor: `var(--${color}-${(i + 1) * 100})`
            }}
          />
        ))}
      </div>
    </div>
  );
}
