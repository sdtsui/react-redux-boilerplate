import React, { Component, PropTypes } from 'react';
import Button from './components/Button';
import Icon from './components/Icon';
import Modal from './components/Modal';
import ModalInputGroup from './components/ModalInputGroup';

class ImageButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      src: props.src,
      type: 'image',
      description: 'addDescription',
      showModal: false,
    };
  }

  updateSrc = src => {
    this.setState({ src });
  };

  addVideo = () => {
    this.props.addMedia({
      src: this.state.src,
      description: this.state.description,
      type: this.state.type,
    });
  };

  toggleModal = () => {
    this.setState({ showModal: !this.state.showModal });
  };

  render() {
    const imageModal = (
      <Modal
        title="Insert / editor image"
        onCloseClick={this.toggleModal}
        onOkClick={() => { this.addVideo(); this.toggleModal(); }}
        onCancelClick={this.toggleModal}
      >
        <ModalInputGroup title="Source">
          <input
            type="text"
            onChange={e => this.updateSrc(e.target.value)}
            value={this.state.src}
          />
        </ModalInputGroup>
        <ModalInputGroup title="Image description">
          <input
            type="text"
            onChange={e => this.updateSrc(e.target.value)}
            value={this.state.description}
          />
        </ModalInputGroup>
        <ModalInputGroup title="Upload file">
          <input type="file"/>
        </ModalInputGroup>
      </Modal>
    );

    return (
      <Button
        onClick={e => this.state.showModal ? null : this.toggleModal()}>
        <Icon icon={'image'}/>
        {this.state.showModal ? imageModal : null}
      </Button>
    );
  }
}

ImageButton.defaultProps = {
  src: 'http://i.imgur.com/zxy9hLn.jpg',
};

ImageButton.propTypes = {
  addMedia: PropTypes.func.isRequired,
};

export default ImageButton;
