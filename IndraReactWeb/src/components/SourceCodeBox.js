import React from 'react';
import autoBind from 'react-autobind';
import PropTypes from 'prop-types';
import axios from 'axios';
import config from 'IndraReactCommon/config';
import PageLoader from './PageLoader';
import ErrorCatching from './ErrorCatching';
import Heading from './Heading';

const SOURCE_URL = config.SOURCE_URL;

export default class SourceCodeBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modelID: this.props.modelID,
      title: "Source Code",
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
      loadingData, serverError, code, title
    } = this.state;
    if (serverError) {
      return <ErrorCatching />;
    }
    if (loadingData) {
      return <PageLoader/>;
    }
    return (
      <div>
        <div className="card">
          <Heading
            sectionLevel={"h5"}
            style={{ textAlign: 'center', fontSize: 16 }}
            className={"card-header bg-primary text-white"}
            text={title}
          />
          <div className="card-body overflow-auto">
            <pre className="card-text">
              { code }
            </pre>
          </div>
        </div>
      </div>
    )
  }
}

SourceCodeBox.propTypes = {
  modelID: PropTypes.string,
  code: PropTypes.string,
  loadingData: PropTypes.bool,
  serverError: PropTypes.bool
};

SourceCodeBox.defaultProps = {
  modelID: "",
  code: "",
  loadingData: true,
  serverError: false
};
