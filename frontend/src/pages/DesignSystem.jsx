import {
  TextField,
  Button,
  BrainCircuitIcon,
  BrainIcon,
  FilterIcon,
  PlusIcon,
  SearchIcon,
  TrashIcon,
  PauseIcon,
  CheckmarkIcon,
  HourglassIcon,
  DangerIcon,
  Icon,
  DotLoader,
  SlashLoader,
  Dropdown,
  IconDropdown,
  SlideToggle,
  SlideToggleText,
  RowSelect,
} from '../components';
import { useState } from 'react';

export default function DesignSystem() {
  const [selectedOption, setSelectedOption] = useState('test1');

  const handleSelectChange = (newValue) => {
    setSelectedOption(newValue);
  };

  const [testToggle, setTestToggle] = useState(false);
  const [testToggleText, setToggleText] = useState('year');

  const [rowSelect, setRowSelect] = useState([]);

  return (
    <div id="design-component-grid">
      <DesignComponent title={'Selects'}>
        <RowSelect
          selectState={rowSelect}
          setSelectState={setRowSelect}
          options={['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']}
          variant={'primary'}
        />
      </DesignComponent>
      <DesignComponent title={'Toggles'}>
        <SlideToggle
          toggleState={testToggle}
          setToggleState={setTestToggle}
          variant={'primary'}
          label={'Label'}
        />
        <SlideToggle
          toggleState={testToggle}
          setToggleState={setTestToggle}
          variant={'accent'}
        />
        <SlideToggle
          toggleState={testToggle}
          setToggleState={setTestToggle}
          variant={'error'}
        />
        <SlideToggleText
          toggleState={testToggleText}
          setToggleState={setToggleText}
          options={['year', 'month', 'week']}
          variant={'accent'}
        />
        <SlideToggleText
          toggleState={testToggleText}
          setToggleState={setToggleText}
          options={['year', 'month', 'week']}
          variant={'error'}
        />
        <SlideToggleText
          toggleState={testToggleText}
          setToggleState={setToggleText}
          options={['year', 'month', 'week']}
          variant={'primary'}
        />
      </DesignComponent>
      <DesignComponent title={'Loader'}>
        <SlashLoader />
        <DotLoader />
      </DesignComponent>
      <DesignComponent title={'Dropdowns'}>
        <div id="dropdown-ds-container">
          <Dropdown
            options={['Month', 'Week', 'Day']}
            value={selectedOption}
            variant={'primary'}
            onChange={handleSelectChange}
          />
          <IconDropdown
            icons={[
              FilterIcon,
              PauseIcon,
              CheckmarkIcon,
              HourglassIcon,
              DangerIcon,
            ]}
            options={['pendingTasks', 'doneTasks', 'oldest', 'status']}
            value={selectedOption}
            variant={'primary'}
            onChange={handleSelectChange}
          />
          <IconDropdown
            icons={[
              FilterIcon,
              PauseIcon,
              CheckmarkIcon,
              HourglassIcon,
              DangerIcon,
            ]}
            options={['pendingTasks', 'doneTasks', 'oldest', 'status']}
            value={selectedOption}
            variant={'accent'}
            onChange={handleSelectChange}
          />
          <IconDropdown
            icons={[
              FilterIcon,
              PauseIcon,
              CheckmarkIcon,
              HourglassIcon,
              DangerIcon,
            ]}
            options={['pendingTasks', 'doneTasks', 'oldest', 'status']}
            value={selectedOption}
            variant={'error'}
            onChange={handleSelectChange}
          />
          <IconDropdown
            icons={[
              FilterIcon,
              PauseIcon,
              CheckmarkIcon,
              HourglassIcon,
              DangerIcon,
            ]}
            options={['pendingTasks', 'doneTasks', 'oldest', 'status']}
            value={selectedOption}
            variant={'gray'}
            onChange={handleSelectChange}
          />
        </div>
      </DesignComponent>
      <DesignComponent title={'Icons'}>
        <DesignIcons />
      </DesignComponent>
      <DesignComponent title={'Text Fields'}>
        <TextField
          variant="primary"
          label={'Primary'}
          placeholder="IDEA"
          beforeText={'CREATE/'}
        />
        <TextField
          variant="accent"
          label={'Accent'}
          placeholder="Create a Network"
          beforeIcon={BrainCircuitIcon}
        />
        <TextField
          variant="error"
          label={'Error'}
          placeholder="Type 'delete'"
          beforeIcon={TrashIcon}
        />
        <TextField
          variant="gray"
          label={'Gray'}
          placeholder="Search something..."
          afterIcon={SearchIcon}
        />
      </DesignComponent>
      <DesignComponent title={'Buttons'}>
        <Button variant="primary">PRIMARY</Button>
        <Button variant="primary">
          <PlusIcon />
          CREATE
        </Button>
        <Button variant="primary" squared={true}>
          <PlusIcon />
        </Button>
        <Button variant="accent">
          <BrainCircuitIcon />
          NETWORK
        </Button>
        <Button variant="gray">
          <BrainIcon />
          MIND
        </Button>
        <Button variant="error">
          <TrashIcon />
          DELETE
        </Button>
        <Button variant="error" squared={true}>
          <TrashIcon />
        </Button>
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
      <DesignComponent title={'Typography'}>
        <h1>Heading 1</h1>
        <h2>Heading 2</h2>
        <h3>Heading 3</h3>
        <h4>Heading 4</h4>
        <h5>Heading 5</h5>
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
              backgroundColor: `var(--${color}-${(i + 1) * 100})`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

function DesignIcons() {
  return (
    <>
      <p>Raw Icons</p>
      <div className="raw-icons">
        <PlusIcon />
        <BrainIcon />
        <BrainCircuitIcon />
        <TrashIcon />
      </div>
      <p>Displayed Icons</p>{' '}
      <div className="raw-icons">
        <Icon variant="primary" size="lg">
          <PlusIcon size="lg" />
        </Icon>
        <Icon variant="primary" size="md">
          <PlusIcon size="md" />
        </Icon>
        <Icon variant="primary">
          <PlusIcon />
        </Icon>
      </div>
      <div className="raw-icons">
        <Icon variant="accent" type="stroke" size="lg">
          <BrainCircuitIcon size="lg" />
        </Icon>
        <Icon variant="accent" type="stroke" size="md">
          <BrainCircuitIcon size="md" />
        </Icon>
        <Icon variant="accent" type="stroke">
          <BrainCircuitIcon />
        </Icon>
      </div>
      <div className="raw-icons">
        <Icon variant="error" size="lg">
          <TrashIcon size="lg" />
        </Icon>
        <Icon variant="error" size="md">
          <TrashIcon size="md" />
        </Icon>
        <Icon variant="error">
          <TrashIcon />
        </Icon>
      </div>
      <div className="raw-icons">
        <Icon variant="border" type="stroke" size="lg">
          <BrainIcon size="lg" />
        </Icon>
        <Icon variant="border" type="stroke" size="md">
          <BrainIcon size="md" />
        </Icon>
        <Icon variant="border" type="stroke">
          <BrainIcon />
        </Icon>
      </div>
    </>
  );
}
