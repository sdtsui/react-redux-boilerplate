// @flow
import React, { PropTypes } from 'react';

const App = (props: Object) => {
  return (
    <div>
      {props.children}
    </div>
  );
};

App.propTypes = {
  children: PropTypes.node,
};

export default App;
