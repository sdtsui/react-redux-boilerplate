import React, { Component, PropTypes } from 'react';
import { EditorBlock } from 'draft-js';
import Layout1Modal from './Layout1Modal';
import { addBlockData } from './Layout1';
import './Layout1.scss';

class Layout1 extends Component {
  constructor() {
    super();
    this.state = {
      showModal: false, // used to display the modal
    };
  }

  componentDidUpdate(prevProps, prevState) {
    // Due to the nature of a contentEditable. It is not possible to interact with a modal
    // unless the modal is outside of the contentEditable div. For this reason when the
    // this component updates we mount this component outside the contentEditable div.

    // We read the state from the block properties.
    const data = this.props.block.getData();
    const modal = (
      <Layout1Modal
        update={this.updateBlockData}
        closeModal={this.closeModal}
        src={data.get('src') || this.props.src}
        width={data.get('width') || this.props.width}
        height={data.get('height' || this.props.height)}
        floatRight={data.get('floatRight') || this.props.floatRight}
      />
    );
    if (this.state.showModal === true) {
      this.props.blockProps.setModal(modal);
    }
    if (prevState.showModal === true && this.state.showModal === false) {
      this.props.blockProps.setModal(null);
    }
  }

  componentWillUnmount() {
    this.props.blockProps.setModal(null);
  }

  closeModal = () => {
    this.setState({ showModal: false });
  };

  updateBlockData = (prop, val) => {
    const { block, blockProps: { getEditorState, updateEditorState } } = this.props;
    const blockKey = block.getKey();
    const editorState = addBlockData(getEditorState(), blockKey)({ [prop]: val });

    return updateEditorState(editorState);
  };

  toggleModal = () => {
    this.setState({ showModal: !this.state.showModal });
  };

  render() {
    const data = this.props.block.getData();

    const className = data.get('floatRight') || this.props.floatRight
      ? 'layout-1 float-right'
      : 'layout-1';

    return (
      <div className={className}>
        <img
          style={{
            height: data.get('height') || this.props.height,
            width: data.get('width') || this.props.width,
          }}
          onClick={this.toggleModal}
          src={data.get('src') || this.props.src}
          className="layout-1__image"
        />
        <EditorBlock{...this.props} />
      </div>
    );
  }
}

Layout1.defaultProps = {
  src: 'http://assets1.ignimgs.com/2014/12/02/league-of-legends-champions-art-1280x720jpg-14aa17_1280w.jpg',
  width: '450px',
  height: 'auto',
  floatRight: false,

};

Layout1.propTypes = {
  blockProps: PropTypes.object.isRequired,
  block: PropTypes.object.isRequired,
  src: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  floatRight: PropTypes.bool.isRequired,
};

export default Layout1;
