import React, { Component } from 'react';
import UI from '../../helpers/UI';
import { bindActionCreators } from 'redux';
import BlogPost from './BlogPosts';
import BlogPost2 from './BlogPosts2';

const Blog = (props) => {
  const posts = [
    { title: 'title 1' },
    { title: 'title 2' },
    { title: 'title 3' },
    { title: 'title 4' },
    { title: 'title 5' },
    { title: 'title 6' },
  ];

  /**
   * Renders blog posts
   * @param posts
   * @param prefix
   */
  const blogPosts = (posts, prefix) => {
    return posts.map((post, i) => {
      return (
        <BlogPost
          key={i}
          title={post.title}
        />);
    });
  };
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
      <button onClick={props.sayHi}>
        sayHi
      </button>
      {blogPosts(posts)}
    </div>
  );
};

const initialState = {
  firstName: '',
  lastName: '',
  dob: '',
};

const mapStateToProps = (state) => {
  return {
    customState: state.filters,
  }
};

const sayHi = () => {
  console.log('sayHi');
  return {
    type: 'UI/SET_UI_STATE',
    payload: { color: 'red' },
    key: 'Blog',
  }
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ sayHi }, dispatch);
};

export default UI('Blog', initialState, mapStateToProps, mapDispatchToProps)(Blog);
