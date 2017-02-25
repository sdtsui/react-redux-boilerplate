import React, { Component, PropTypes } from 'react';
import { EditorBlock } from 'draft-js';
import './Layout1.scss';

class Layout1 extends Component {
  constructor() {
    super();
    this.state = {
      showSettings: false,
      width: '400px',
      height: 'auto',
      floatRight: false,
      src: 'http://assets1.ignimgs.com/2014/12/02/league-of-legends-champions-art-1280x720jpg-14aa17_1280w.jpg',
    };
  }

  componentDidUpdate(prevProps, prevState) {
    const modal = (
      <span id="settings">
        <span className="settings-wrapper">
          <label>Width:</label>
          <input
            onChange={e => this.save('width', e.target.value)}
            value={this.state.width}
            type="text"
            placeholder="width"
          />
          <label>Height:</label>
          <input
            onChange={e => this.save('height', e.target.value, )}
            value={this.state.height}
            type="text"
            placeholder="height"
          />
          <label>Flip:</label>
          <input
            onChange={e => this.save('floatRight', !this.state.floatRight)}
            value={this.state.floatRight}
            type="checkbox"
          />
          <label>Src:</label>
          <input
            onChange={e => this.save('src', e.target.value)}
            value={this.state.src}
            type="text"
          />
          <button
            className="close-button"
            onClick={() => this.save('showSettings', false)}>Close
          </button>
        </span>
      </span>
    );
    if (this.state.showSettings === true) {
      this.props.blockProps.setModal(modal);
    }
    if (prevState.showSettings === true && this.state.showSettings === false) {
      this.props.blockProps.setModal(null);
    }
  }

  componentWillUnmount() {
    this.props.blockProps.setModal(null);
  }

  save = (prop, val) => {
    this.setState({ [prop]: val });
  };

  toggleSettings = () => {
    this.setState({ showSettings: !this.state.showSettings });
  };

  render() {
    const className = this.state.floatRight ? 'layout-1 float-right' : 'layout-1';
    return (
      <div className={className}>
        <img
          style={{
            height: this.state.height,
            width: this.state.width,
          }}
          onClick={this.toggleSettings}
          src={this.state.src}
          className="layout-1__image"
        />
        <EditorBlock{...this.props} />
      </div>
    );
  }
}

export default Layout1;
