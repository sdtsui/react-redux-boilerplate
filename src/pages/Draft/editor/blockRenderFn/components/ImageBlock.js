import React, { Component, PropTypes } from 'react';
import { EditorState, SelectionState } from 'draft-js';
import { fromJS } from 'immutable';
import { changeBlockDataForBlockKeys, removeBlockWithKey } from '../../../core';
import Layout1Modal from './ImageModal';
import Icon from '../../../core/components/Icon';
import './Image.scss';

// TODO: [] Move into separate file for testing
const editorStateWithoutFocus = editorState => {
  const selection = editorState.getSelection();
  const newSelection = SelectionState.createEmpty().merge({
    ...selection.toJS(),
    hasFocus: false,
  });

  return EditorState.acceptSelection(editorState, newSelection);
};

const addBlockData = (editorState, blockKey) =>
  data => changeBlockDataForBlockKeys(editorState, [blockKey], fromJS(data));

class ImageComponent extends Component {
  constructor() {
    super();
    this.state = {
      showModal: false,
    };
    this.focus = () => this.refs.image.focus();
  }

  closeModal = () => {
    const { blockProps: { getEditorState, updateEditorState } } = this.props;
    this.setState({ showModal: false }, () => {
      this.props.blockProps.toggleReadOnly(false);
      updateEditorState(editorStateWithoutFocus(getEditorState()));
    });
  };

  openModal = () => {
    const { blockProps: { getEditorState, updateEditorState } } = this.props;
    this.setState({ showModal: true }, () => {
      this.props.blockProps.toggleReadOnly(true);
      updateEditorState(editorStateWithoutFocus(getEditorState()));
    });
  };

  updateBlockData = (prop, val) => {
    const { block, blockProps: { getEditorState, updateEditorState } } = this.props;
    const blockKey = block.getKey();
    const editorState = addBlockData(getEditorState(), blockKey)({ [prop]: val });

    return updateEditorState(editorStateWithoutFocus(editorState));
  };

  handleFileInput = e => {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      return this.updateBlockData('src', reader.result);
    };

    reader.readAsDataURL(file);
  };

  selectImage = () => {
    const block = this.props.block;
    const blockKey = block.getKey();
    const blockLength = block.getLength();
    const { getEditorState, updateEditorState } = this.props.blockProps;
    const editorState = getEditorState();
    const newSelection = SelectionState.createEmpty().merge({
      anchorKey: blockKey,
      focusKey: blockKey,
      anchorOffset: blockLength,
      focusOffset: blockLength,
    });

    console.log('newSelection', newSelection.toJS());
    const newEditorState = EditorState.forceSelection(editorState, newSelection);

    return updateEditorState(newEditorState);
  };

  imageSelected = () => {
    const blockKey = this.props.block.getKey();
    const { getEditorState } = this.props.blockProps;
    const selection = getEditorState().getSelection();
    const startKey = selection.getStartKey();
    const endKey = selection.getEndKey();

    return startKey === blockKey && endKey === blockKey;
  };

  render() {
    const blockData = this.props.block.getData();
    const entityData = this.props.data;
    const src = entityData.get('src');

    const modal = (
      <Layout1Modal
        update={this.updateBlockData}
        handleUpload={this.handleFileInput}
        closeModal={this.closeModal}
        src={blockData.get('src')}
        width={blockData.get('width')}
        height={blockData.get('height')}
        defaultSrc={this.props.src}
        defaultWidth={this.props.width}
        defaultHeight={this.props.height}
      />
    );

    const imgStyles = {
      height: blockData.get('height') || this.props.height,
      width: blockData.get('width') || this.props.width,
      border: this.imageSelected() ? '1px solid red' : null,
    };

    return (
      <div className="image-wrapper">
        {this.state.showModal && modal}
        <span onClick={this.openModal} className="focus-button">
          <Icon icon="cog"/>
        </span>
        <img
          ref="image"
          style={imgStyles}
          onClick={this.selectImage}
          src={src}
          className="layout-1__image"
        />
      </div>
    );
  }
}

ImageComponent.defaultProps = {
  width: '450px',
  height: 'auto',
  src: 'http://placehold.it/450x300',
};

ImageComponent.propTypes = {
  data: PropTypes.object.isRequired,
  blockProps: PropTypes.object.isRequired,
  block: PropTypes.object.isRequired,
  src: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  toggleReadOnly: PropTypes.func.isRequired,
};

export default ImageComponent;
