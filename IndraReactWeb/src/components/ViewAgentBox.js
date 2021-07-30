import React from 'react';
import autoBind from 'react-autobind';
import PropTypes from 'prop-types';
import config from 'IndraReactCommon/config';
import axios from 'axios';
import ErrorCatching from './ErrorCatching';
import Heading from './Heading';
import PageLoader from './PageLoader';

const AGENT_URL = config.AGENT_URL

export default class ViewAgentBox extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);

    this.state = {
      EXEC_KEY: this.props.EXEC_KEY,
      agentName: "",
      displayBox: false,
      title: "Agent",
      errorMessage: "",
      content: "",
      serverError: false,
      loadingData: false,
    };
  }

  handleClick = async () => {
    const { EXEC_KEY, agentName } = this.state;
    if (agentName) {
      this.setState({
        loadingData: true,
        errorMessage: ""
      })
      try {
        let res = await axios.get(`${AGENT_URL}`, {
          params: {
            exec_key: EXEC_KEY,
            name: agentName
          }
        })
        this.setState({
          content: JSON.stringify(res.data, null, 2),
          displayBox: true,
          loadingData: false
        });
      } catch (error) {
        if (error.response.status === 404) {
          this.setState({
            errorMessage: error.response.data.message,
            loadingData: false,
            displayBox: false
          });
        } else {
          this.setState({
            serverError: true
          });
        }
      }
    }
    else {
      this.setState({
        errorMessage: "Error: No agent name entered"
      })
    }
  }

  handleAgentName = (e) => {
    this.setState({
      agentName: e.target.value,
    });
  }

  renderAgentBox = () => {
    const { title, content } = this.state;
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

  render() {
    const { errorMessage, serverError, displayBox, loadingData } = this.state;
    if (serverError) {
      return <ErrorCatching />;
    }
    if (loadingData) {
      return <PageLoader/>;
    }
    return (
      <div>
        <div>
          <div>
            {' '}
            <span>Please enter name of agent:</span>
            {' '}
            <input
              type="text"
              className="from-control m-2"
              style={{ width: '100px' }}
              onChange={this.handleAgentName}
            />
            <button
              type="button"
              onClick={this.handleClick}
              className="btn btn-success m-2"
            >
              {'  '}
              Submit
              {'  '}
            </button>
            <span className="error-message">
            {errorMessage}
            </span>
          </div>
          {(displayBox) && this.renderAgentBox()}
        </div>
      </div>
    );
  }
}

ViewAgentBox.propTypes = {
  EXEC_KEY: PropTypes.number,
  agentName: PropTypes.string,
  displayBox: PropTypes.bool,
  title: PropTypes.string,
  errorMessage: PropTypes.string,
  content: PropTypes.string,
  serverError: PropTypes.bool,
  loadingData: PropTypes.bool,
};

ViewAgentBox.defaultProps = {
  EXEC_KEY: -1,
  agentName: "",
  displayBox: false,
  title: "",
  errorMessage: "",
  content: "",
  serverError: false,
  loadingData: false,
};
