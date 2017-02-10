import React, { PropTypes } from 'react';

const Button = props => {
  const { children, className, ...rest } = props;
  return (
    <button className={className} {...rest}>
      {children}
    </button>
  );
};
Button.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default Button;
