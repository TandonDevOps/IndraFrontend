import React from 'react';
import autoBind from 'react-autobind';
import PropTypes from 'prop-types';

export default class Paragraph extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);

    this.state = {
      className: this.props.className,
      text: this.props.text,
    };
  }

  render() {
    const {
      className, text,
    } = this.state;
    return (
      <div>
        <p className = {className}>
          {text}
        </p>
      </div>
    );
  }
}

Paragraph.propTypes = {
  className: PropTypes.string,
  text: PropTypes.string
};

Paragraph.defaultProps = {
  className: "",
  text: ""
}
