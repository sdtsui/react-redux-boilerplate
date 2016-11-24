// @flow
import React, { PropTypes } from 'react';

const Page1 = (props: Object) => {
  console.log('app props', props);
  const { page1 } = props;
  return (
    <div>
      <h1>Hello Worldsssasdfasd asdf asd ff!!</h1>
      <button onClick={() => props.setState({ clicks: page1.clicks + 1 })}>
        <p>Clicks {page1.clicks}</p>
      </button>
      <button onClick={() => props.setState({ clicks: page1.clicks + 1 }, 'DEFAULT')}>
        <p>Clicks {page1.clicks}</p>
      </button>
    </div>
  );
};

export default Page1;
