import React from 'react';
import UI from '../../helpers/UI';

const BlogPost = (props) => {
  console.log(props);
  return (
    <div>
      <h2>Title {props.title}</h2>
      <h2>Title {props.state.isSelected ? 'clicked' : 'not clicked'}</h2>
      <button
        onClick={() => props.setLocalState({isSelected: !props.state.isSelected})}>
        Click
      </button>
    </div>
  );
};

export default UI(null, { isSelected: false })(BlogPost);
