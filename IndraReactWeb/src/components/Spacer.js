import React from 'react';
import autoBind from 'react-autobind';
import PropTypes from 'prop-types';

export default class Spacer extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);

    this.state = {
      className: this.props.className,
      text: this.props.text,
      type: this.props.type
    };
  }

  render() {
    const {
      className, text, type,
    } = this.state;
    return (
      <div>
          className = {className}
          type={type}
        >
          {text}
      </div>
    );
  }
}

Spacer.propTypes = {
  className: PropTypes.string,
  text: PropTypes.string,
  type: PropTypes.string
};

Spacer.defaultProps = {
  className: "",
  text: "",
  type: ""
};
