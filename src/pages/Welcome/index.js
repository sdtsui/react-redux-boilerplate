import React from 'react';
import UI from '../../helpers/UI';

@UI('welcome', { visitors: 0 })
class Welcome extends React.Component {
  render() {
    console.log('welcome props', this.props);
    if (!this.props.welcome) {
      return <div></div>;
    }
    const { visitors } = this.props.welcome;
    return (
      <div>
        <h2>Welcome</h2>
        <button
          onClick={() => this.props.setLocalState({visitors: visitors + 1})}
        >
          Visitors {visitors}
        </button>
      </div>
    );
  }
}
export default Welcome;

