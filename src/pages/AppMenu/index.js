import React, { Component } from 'react';
import UI from '../../helpers/UI';
import AppMenu from './AppMenu';

class AppMenuContainer extends Component {
  render() {
    return <AppMenu {...this.props}/>;
  }
}

const key = 'AppMenu';
const initialState = { isOnline: false };
export default UI(AppMenu, key, initialState);

// default props
AppMenuContainer.defaultProps = {};

// propTypes
AppMenuContainer.propTypes = {};
