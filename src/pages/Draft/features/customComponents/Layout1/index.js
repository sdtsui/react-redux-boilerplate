import React, { Component, PropTypes } from 'react';
import { EditorBlock, EditorState, SelectionState } from 'draft-js';
import Layout1Modal from './Layout1Modal';
import { addBlockData } from './Layout1';
import './Layout1.scss';

class Layout1 extends Component {
  constructor() {
    super();
    this.state = {
      showModal: false,
    };
  }

  componentWillUnmount() {
    console.log('unmounted');
  }

  closeModal = () => {
    this.setState({ showModal: false });
    this.props.blockProps.toggleReadOnly(false);
  };

  openModal = () => {
    this.setState({ showModal: true });
    this.props.blockProps.toggleReadOnly(true);
  };

  updateBlockData = (prop, val) => {
    const { block, blockProps: { getEditorState, updateEditorState } } = this.props;
    const blockKey = block.getKey();
    const editorState = addBlockData(getEditorState(), blockKey)({ [prop]: val });
    const selection = editorState.getSelection();

    // This part is important, It is used by not giving focus to the editor.
    const newSelection = SelectionState.createEmpty().merge({
      ...selection.toJS(),
      hasFocus: false,
    });

    // force selection breaks the editor acceptSelection must be used instead.
    return updateEditorState(EditorState.acceptSelection(editorState, newSelection));
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
      <div>
        {this.state.showModal && modal}
        <div className={className}>
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
