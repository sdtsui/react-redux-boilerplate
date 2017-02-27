import React, { Component, PropTypes } from 'react';
import { EditorBlock, EditorState, SelectionState } from 'draft-js';
import Layout1Modal from './Layout1Modal';
import { addBlockData } from './Layout1';
import './Layout1.scss';

const editorStateWithoutFocus = editorState => {
  const selection = editorState.getSelection();
  const newSelection = SelectionState.createEmpty().merge({
    ...selection.toJS(),
    hasFocus: false,
  });

  return EditorState.acceptSelection(editorState, newSelection);
};

class Layout1 extends Component {
  constructor() {
    super();
    this.state = {
      showModal: false,
    };
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

  render() {
    // console.log('this.props', this.props);
    const data = this.props.block.getData();

    const className = data.get('floatRight') || this.props.floatRight
      ? 'layout-1 float-right'
      : 'layout-1';

    const modal = (
      <Layout1Modal
        update={this.updateBlockData}
        handleUpload={this.handleFileInput}
        closeModal={this.closeModal}
        src={data.get('src')}
        width={data.get('width')}
        height={data.get('height')}
        floatRight={data.get('floatRight')}
        defaultSrc={this.props.src}
        defaultWidth={this.props.width}
        defaultHeight={this.props.height}
        defaultFloatRight={this.props.floatRight}
      />
    );

    return (
      <div ref="layout1" className={className}>
        {this.state.showModal && modal}
        <img
          style={{
              height: data.get('height') || this.props.height,
              width: data.get('width') || this.props.width,
            }}
          onClick={this.openModal}
          src={data.get('src') || this.props.src}
          className="layout-1__image"
        />
        <EditorBlock{...this.props} />
      </div>
    );
  }
}

Layout1.defaultProps = {
  width: '450px',
  height: 'auto',
  src: 'http://placehold.it/450x300',
};

Layout1.propTypes = {
  blockProps: PropTypes.object.isRequired,
  block: PropTypes.object.isRequired,
  src: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  floatRight: PropTypes.bool.isRequired,
  toggleReadOnly: PropTypes.func.isRequired,
};

export default Layout1;
