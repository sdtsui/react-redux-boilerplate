import React, { Component } from 'react';
import UI from '../../helpers/UI';
import Menu from './Menu';

class MenuContainer extends Component {
  render() {
    return <Menu {...this.props}/>;
  }
}

const key = 'Menu';
const initialState = { isCollapsible: true };
export default UI(Menu, key,initialState);

// default props
MenuContainer.defaultProps = {};

// propTypes
MenuContainer.propTypes = {};
