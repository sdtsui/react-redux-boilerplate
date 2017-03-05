import React, { PropTypes } from 'react';
import Modal from '../../../core/components/Modal';
import ModalInputGroup from '../../../core/components/ModalInputGroup';

const ImageModal = props => {
  return (
    <Modal
      title="Layout 1 Settings"
      onCloseClick={props.closeModal}
      onOkClick={props.closeModal}
      onCancelClick={props.closeModal}
    >
      <ModalInputGroup title="Image Width">
        <input
          onChange={e => props.update('width', e.target.value)}
          value={props.width}
          type="text"
          placeholder="width"
        />
      </ModalInputGroup>
      <ModalInputGroup title="Image Height">
        <input
          onChange={e => props.update('height', e.target.value)}
          value={props.height}
          type="text"
          placeholder="height"
        />
      </ModalInputGroup>
      <ModalInputGroup title="Image Source">
        <input
          onChange={e => props.update('src', e.target.value)}
          value={props.src}
          type="text"
        />
      </ModalInputGroup>
      <ModalInputGroup title="Upload file">
        <input
          type="file"
          onChange={props.handleUpload}
        />
      </ModalInputGroup>
    </Modal>
  );
};

export default ImageModal;

ImageModal.propTypes = {
  floatRight: PropTypes.bool,
  width: PropTypes.string,
  height: PropTypes.string,
  src: PropTypes.string,
  update: PropTypes.func.isRequired,
  handleUpload: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
};
