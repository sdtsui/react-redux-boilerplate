import React from 'react';

const BlogPost = (props) => {
  return (
    <div>
      <h2>Title {props.title}</h2>
      <button
        onClick={() => props.setLocalState({isSelected: true})}>
        Click
      </button>
    </div>
  );
};

export default BlogPost;
