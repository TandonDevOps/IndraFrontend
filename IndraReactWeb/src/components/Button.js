import React from 'react';
import autoBind from 'react-autobind';
import PropTypes from 'prop-types';

export default class Button extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);

    this.state = {
      className: this.props.className,
      text: this.props.text,
      onClick: this.props.onClick,
      disabled: this.props.disabled,
      type: this.props.type
    };
  }

  render() {
    const {
      className, text, onClick, disabled, type,
    } = this.props;
    return (
      <div>
        <button
          className = {className}
          onClick={onClick}
          disabled={disabled}
          type={type}
        >
          {text}
        </button>
      </div>
    );
  }
}

Button.propTypes = {
  className: PropTypes.string,
  text: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  type: PropTypes.string
};

Button.defaultProps = {
  className: "",
  text: "",
  onClick() {},
  disabled: false,
  type: ""
};
