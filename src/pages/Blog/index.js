import React, { Component } from 'react';
import UI from '../../helpers/UI';

const Blog = props => {
  return (
    <div>
      <div>
        <input
          onChange={(e) => props.setLocalState({ firstName: e.target.value})}
          type="text"
          placeholder="first Name"
          value={props.firstName}
        />
      </div>
      <div>
        <input
          onChange={(e) => props.setLocalState({ lastName: e.target.value})}
          type="text"
          placeholder="last Name"
          value={props.lastName}
        />
      </div>
      <div>
        <input
          onChange={(e) => props.setLocalState({ dob: e.target.value})}
          type="text"
          placeholder="DOB"
          value={props.dob}
        />
      </div>
    </div>
  );
};

const initialState = {
  firstName: '',
  lastName: '',
  dob: '',
};

export default UI(Blog, 'Blog', initialState);