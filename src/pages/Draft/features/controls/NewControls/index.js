import React from 'react';
import './NewControls.scss';

const Icon = props => {
  return (
    <i
      onClick={props.onClick}
      className={`fa fa-${props.icon}`}
    />
  );
};

const TextEditor = props => {
  return (
    <div className="text-editor">
      {props.children}
    </div>
  );
};

const ModalInputGroup = props => {
  return (
    <div className="modal-input-group">
      <span>{props.title}</span>
      { props.children }
    </div>
  );
};

const ModalOptions = props => {
  return (
    <div className="modal-contents">
      <div className="modal-header">
        <h2>{props.title}</h2>
        <label htmlFor={props.inputId}>
          <Icon
            icon="times"
            onClick={props.onCloseClick}
          />
        </label>
      </div>
      <div className="modal-body">
        { props.children }
      </div>
      <div className="modal-footer">
        <button
          onClick={props.onOkClick}
          className="success"
        >
          Ok
        </button>
        <button
          onClick={props.onCancelClick}
          className="cancel"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

const Modal = props => {
  return (
    <div className="modal">
      {props.children}
    </div>
  );
};

const Button = props => {
  return (
    <span className="text-editor-button">
      {props.children}
    </span>
  );
};

const ButtonGroup = props => {
  return (
    <div className="button-group">
      {props.children}
    </div>
  );
};

const ButtonSelector = props => {
  return (
    <span
      onClick={props.onClick}
      className="button-selector"
    >
      <Icon icon="caret-down"/>
    </span>
  );
};

const ButtonSelect = props => {
  return (
    <span
      className="button-select"
      style={{ width: props.width ? props.width : '100%' }}
    >
      {props.children}
    </span>
  );
};

const ButtonOption = props => {
  return (
    <span
      onClick={props.onClick}
      className="button-option"
    >
      {props.children}
    </span>
  );
};

class ButtonToggle extends React.Component {
  constructor() {
    super();
    this.state = {
      isOpen: false,
      isRenderable: false,
      selected: null,
    };
  }

  componentWillMount() {
    const isRenderable = this.props.children.every(child => child.key);
    this.setState({ isRenderable });
  }

  toggleButton = () => {
    this.setState(
      {
        isOpen: !this.state.isOpen,
      }
    );
  };

  selectOption(value) {
    this.setState({ selected: value });
  }

  render() {
    if (!this.state.isRenderable) {
      console.log('Please pass a key to the buttonOption');
      return null;
    }
    const classNames = this.state.isOpen
      ? 'button-toggle'
      : 'button-toggle hide-options';

    const childrenWithProps = children => React.Children.map(
      children,
      child => React.cloneElement(
        child,
        {
          onClick: () => {
            this.selectOption(child.key);
            if (child.props.onClick) {
              child.props.onClick();
            }
          },
        }
      )
    );

    const selectedOption = () => {
      if (this.props.children) {
        const filteredChild = this.props.children.filter(
          child => child.key === this.state.selected);
        // make the button clickable
        if (filteredChild.length) return childrenWithProps([filteredChild]);
        // set the first item passed as active.
        return this.selectOption(this.props.children[0].key);
      }

      return null;
    };

    return (
      <span className={classNames}>
        <span
          style={{ width: this.props.width }}
          className="selected-option"
        >
          {selectedOption()}
        </span>
        <ButtonSelect width={this.props.optionsWidth}>
          {childrenWithProps(this.props.children)}
        </ButtonSelect>
        <ButtonSelector onClick={this.toggleButton}/>
      </span>
    );
  }
}

const imageModal = (
  <Modal show={false}>
    <ModalOptions
      title="Insert / editor image"
      inputId="image-modal-checkbox"
      onCloseClick={() => console.log('closed')}
      onOkClick={() => console.log('ok clicked')}
      onCancelClick={() => console.log('cancel clicked')}
    >
      <ModalInputGroup title="Source">
        <input type="text"/>
      </ModalInputGroup>
      <ModalInputGroup title="Image description">
        <input type="text"/>
      </ModalInputGroup>
      <ModalInputGroup title="Upload file">
        <input type="file"/>
      </ModalInputGroup>
    </ModalOptions>
  </Modal>
);

const linkModal = (
  <Modal>
    <ModalOptions
      title="Link Settings"
      inputId="link-modal-checkbox"
      onCloseClick={() => console.log('closed')}
      onOkClick={() => console.log('ok clicked')}
      onCancelClick={() => console.log('cancel clicked')}
    >
      <ModalInputGroup title="Url">
        <input type="text"/>
      </ModalInputGroup>
      <ModalInputGroup title="Text to display">
        <input type="text"/>
      </ModalInputGroup>
      <ModalInputGroup title="Title">
        <input type="text"/>
      </ModalInputGroup>
      <ModalInputGroup title="Target">
        <select>
          <option>
            Option 1
          </option>
        </select>
      </ModalInputGroup>
    </ModalOptions>
  </Modal>
);

const videoModal = (
  <Modal>
    <ModalOptions
      title="Video Settings"
      inputId="video-modal-checkbox"
      onCloseClick={() => console.log('closed')}
      onOkClick={() => console.log('ok clicked')}
      onCancelClick={() => console.log('cancel clicked')}
    >
      <ModalInputGroup title="Url">
        <input type="text"/>
      </ModalInputGroup>
    </ModalOptions>
  </Modal>
);

const TextEditorToolbar = props => {
  return (
    <div className="text-editor-toolbar">
      {props.children}
    </div>
  )
};

const NewControls = () => {
  return (
    <TextEditor>
      <TextEditorToolbar>
        <ButtonGroup>
          <ButtonToggle>
            <ButtonOption
              onClick={() => console.log('Hi')}
              key={1}
            >
              H1
            </ButtonOption>
            <ButtonOption key={2}>
              H2
            </ButtonOption>
            <ButtonOption key={3}>
              H3
            </ButtonOption>
            <ButtonOption key={4}>
              H4
            </ButtonOption>
            <ButtonOption key={5}>
              H5
            </ButtonOption>
            <ButtonOption key={6}>
              H6
            </ButtonOption>
          </ButtonToggle>
        </ButtonGroup>

        <ButtonGroup>
          <ButtonToggle
            width="100px"
          >
            <ButtonOption
              onClick={() => console.log('Hi')}
              key={1}
            >
              Helvetica
            </ButtonOption>
            <ButtonOption key={2}>
              Times
            </ButtonOption>
            <ButtonOption key={3}>
              Verdana
            </ButtonOption>
            <ButtonOption key={4}>
              Sans-serif
            </ButtonOption>
            <ButtonOption key={5}>
              Georgia
            </ButtonOption>
          </ButtonToggle>
        </ButtonGroup>

        <ButtonGroup>
          <Button>
            <Icon icon="square"/>
          </Button>
        </ButtonGroup>

        <ButtonGroup>
          <Button>
            <Icon icon="bold"/>
          </Button>
          <Button>
            <Icon icon="italic"/>
          </Button>
          <Button>
            <Icon icon="underline"/>
          </Button>
          <Button>
            <Icon icon="strikethrough"/>
          </Button>
          <Button>
            <Icon icon="superscript"/>
          </Button>
          <Button>
            <Icon icon="subscript"/>
          </Button>
        </ButtonGroup>

        <ButtonGroup>
          <Button>
            <Icon icon="align-left"/>
          </Button>
          <Button>
            <Icon icon="align-center"/>
          </Button>
          <Button>
            <Icon icon="align-right"/>
          </Button>
          <Button>
            <Icon icon="align-justify"/>
          </Button>
        </ButtonGroup>

        <ButtonGroup>
          <Button>
            <input
              className="modal-checkbox"
              id="image-modal-checkbox" type="checkbox"
            />
            <label
              htmlFor="image-modal-checkbox"
            >
              <Icon icon="image"/>
            </label>
            { imageModal }
          </Button>
          <Button>
            <input
              className="modal-checkbox"
              id="video-modal-checkbox"
              type="checkbox"
            />
            <label
              htmlFor="video-modal-checkbox"
            >
              <Icon icon="film"/>
            </label>
            { videoModal }
          </Button>
          <Button>
            <input
              className="modal-checkbox"
              id="link-modal-checkbox" type="checkbox"
            />
            <label
              htmlFor="link-modal-checkbox"
            >
              <Icon icon="link"/>
            </label>
            { linkModal }
          </Button>
          <Button>
            <Icon icon="chain-broken"/>
          </Button>
        </ButtonGroup>

        <ButtonGroup>
          <Button>
            <Icon icon="list-ol"/>
          </Button>
          <Button>
            <Icon icon="list-ul"/>
          </Button>
        </ButtonGroup>

        <ButtonGroup>
          <Button>
            <Icon icon="save"/>
          </Button>
          <Button>
            <Icon icon="folder-open"/>
          </Button>
        </ButtonGroup>

        <ButtonGroup>
          <Button>
            <Icon icon="undo"/>
          </Button>
          <Button>
            <Icon icon="repeat"/>
          </Button>
        </ButtonGroup>
      </TextEditorToolbar>
    </TextEditor>
  );
};

export default NewControls;
