import React from 'react';
import autoBind from 'react-autobind';
import PropTypes from 'prop-types';

export default class Heading extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);

    this.state = {
      sectionLevel: this.props.sectionLevel,
      text: this.props.text,
      className: this.props.className,
      style: this.props.style
    };
  }

  render() {
    const {
      sectionLevel, text, className, style
    } = this.state;
    let heading;
    if (sectionLevel === "h1"){
      heading = <h1 className={className} style={style}>{text}</h1>
    } else if (sectionLevel === "h2") {
      heading = <h2 className={className} style={style}>{text}</h2>
    } else if (sectionLevel === "h3") {
      heading = <h3 className={className} style={style}>{text}</h3>
    } else if (sectionLevel === "h4") {
      heading = <h4 className={className} style={style}>{text}</h4>
    } else if (sectionLevel === "h5") {
      heading = <h5 className={className} style={style}>{text}</h5>
    } else if (sectionLevel === "h6") {
      heading = <h6 className={className} style={style}>{text}</h6>
    } 
    return (
      <div>
        {heading}
      </div>
    );
  }
}

Heading.propTypes = {
  sectionLevel: PropTypes.string,
  className: PropTypes.string,
  text: PropTypes.string,
  style: PropTypes.object
};

Heading.defaultProps = {
  sectionLevel: "h1",
  className: "",
  text: "",
  style: {}
};
