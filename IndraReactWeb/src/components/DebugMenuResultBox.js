import React from 'react';
import autoBind from 'react-autobind';
import PropTypes from 'prop-types';
import axios from 'axios';
import config from 'IndraReactCommon/config';
import PageLoader from './PageLoader';
import ErrorCatching from './ErrorCatching';
import Heading from './Heading';

const DETAILS_URL = config.DETAILS_URL;
const SOURCE_URL = config.SOURCE_URL;
const REGISTRY_URL = config.REGISTRY_URL;
const LOCATION_URL = config.LOCATION_URL;
const POPHIST_URL = config.POPHIST_URL;


export default class DebugMenuResultBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modelID: this.props.modelID,
      title: this.props.title,
      EXEC_KEY: this.props.EXEC_KEY,
      type: this.props.type,
      content: "",
      loadingData: true,
      serverError: false
    };
    autoBind(this);
  }

  async componentDidMount() {
    const { modelID, EXEC_KEY, type } = this.state
    try {
      let res;
      switch(type) {
        case "details":
          res = await axios.get(`${DETAILS_URL}${EXEC_KEY}`);

          this.setState({
            content: JSON.stringify(res.data, null, 2),
            loadingData: false
          });
          break;

        case "source":
          res = await axios.get(`${SOURCE_URL}${modelID}`);

          this.setState({
            content: res.data,
            loadingData: false
          });
          break;

        case "registry":
          res = await axios.get(`${REGISTRY_URL}`);
          this.setState({
            content: JSON.stringify(res.data, null, 2),
            loadingData: false
          });
          break;
        
        case "locations":
          res = await axios.get(`${LOCATION_URL}${EXEC_KEY}`);
          this.setState({
            content: JSON.stringify(res.data, null, 2),
            loadingData: false
          });
          break;

        case "pophist":
          res = await axios.get(`${POPHIST_URL}${EXEC_KEY}`);
          this.setState({
            content: JSON.stringify(res.data, null, 2),
            loadingData: false
          });
          break;

        default:
          this.setState({
            serverError: true
          })
      }
    } catch (error) {
      this.setState({
        serverError: true
      });
    }
  }

  render() {
    const {
      loadingData, serverError, content, title
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
              <code>
                { content }
              </code>
            </pre>
          </div>
        </div>
      </div>
    )
  }
}

DebugMenuResultBox.propTypes = {
  modelID: PropTypes.string,
  title: PropTypes.string,
  EXEC_KEY: PropTypes.number,
  type: PropTypes.string,
  content: PropTypes.string,
  loadingData: PropTypes.bool,
  serverError: PropTypes.bool
};

DebugMenuResultBox.defaultProps = {
  modelID: "",
  title: "",
  EXEC_KEY: -1,
  type: "",
  content: "",
  loadingData: true,
  serverError: false
};
