import React from 'react';
import autoBind from 'react-autobind';
import PropTypes from 'prop-types';
import axios from 'axios';
import config from 'IndraReactCommon/config';
import PageLoader from './PageLoader';
import ErrorCatching from './ErrorCatching';
import Paragraph from './Paragraph';

const SOURCE_URL = config.SOURCE_URL;

export default class Source extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modelID: this.props.modelID,
      code: "",
      loadingData: true,
      serverError: false
    };
    autoBind(this);
  }

  async componentDidMount() {
    const modelID = this.state.modelID
    try {
      const res = await axios.get(`${SOURCE_URL}${modelID}`)
      this.setState({
        code: res.data,
        loadingData: false
      });
    } catch (error) {
      this.setState({
        serverError: true
      });
    }
  }

  render() {
    const {
      loadingData, serverError, code,
    } = this.state;
    if (serverError) {
      return <ErrorCatching />;
    }
    if (loadingData) {
      return <PageLoader/>;
    }
    return (
      <div>
        <Paragraph
          text={ code }
          style={{ whiteSpace: "pre-wrap" }}
        />
      </div>
    )
  }
}

Source.propTypes = {
  modelID: PropTypes.string,
  code: PropTypes.string,
  loadingData: PropTypes.bool,
  serverError: PropTypes.bool
};

Source.defaultProps = {
  modelID: "",
  code: "",
  loadingData: true,
  serverError: false
};
