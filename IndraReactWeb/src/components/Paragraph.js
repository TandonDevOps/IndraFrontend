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
      style: this.props.style
    };
  }

  render() {
    const {
      className, text, style,
    } = this.state;
    return (
      <div>
        <p className={className} style={style}>
          {text}
        </p>
      </div>
    );
  }
}

Paragraph.propTypes = {
  className: PropTypes.string,
  text: PropTypes.string,
  style: PropTypes.object
};

Paragraph.defaultProps = {
  className: "",
  text: "",
  style: {}
}
