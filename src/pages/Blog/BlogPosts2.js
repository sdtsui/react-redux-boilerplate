import React from 'react';

class BlogPost2 extends React.Component {
  constructor() {
    super();
    this.state = {
      isSelected: false,
    }
  }

  render() {
    return (
      <div>
        <h2>Title {this.props.title}</h2>
        <p>{this.state.isSelected ? 'clicked' : 'notClicked'}</p>
        <button
          onClick={() => this.setState({isSelected: !this.state.isSelected})}>
          Click
        </button>
      </div>
    );
  };
}

export default BlogPost2;