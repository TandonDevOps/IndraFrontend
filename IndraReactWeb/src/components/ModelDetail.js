import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import ModelInputField from './ModelInputField';
import PageLoader from './PageLoader';
import './styles.css';
import config from 'IndraReactCommon/config';
import ErrorCatching from './ErrorCatching';

const OK = 1
const BAD_TYPE = -1
const OUT_OF_RANGE = 0
const QUESTION = 'question'

const apiServer = config.PROPS_URL;

class ModelDetail extends Component {
  constructor(props) {
    super(props);
    const initialModelDetailState = this.getInitialModelDetails();
    this.state = {
      modelParams: {},
      loadingData: false,
      disabledButton: false,
      serverError: false,
      ...initialModelDetailState,
    };
  }

  async componentDidMount() {
    const { history } = this.props;
    const { menuId } = this.state;
    try {
      document.title = 'Indra | Property';
      this.setState({ loadingData: true });
      const properties = await axios.get(
        `${apiServer}${menuId}`,
      );
      this.setState({ modelParams: properties.data });
      this.states(properties.data);
      this.errors(properties.data);
      this.setState({ loadingData: false });
    } catch (e) {
      this.setState({
        serverError: true,
      });
      history.push('/errorCatching');
    }
  }

  getInitialModelDetails() {
    const { location, history, match } = this.props;
    let initialState;
    try {
      const { state } = location;
      if (state === undefined) {
      // this is undefined when someone tried to open the model in a new tab from the home screen.
        const menuId = parseInt(match.params.id, 10);
        const modelParams = JSON.parse(localStorage.getItem('indra_model_details')).filter((item) => item['model ID'] === menuId)[0];
        initialState = {
          menuId,
          name: modelParams.name,
          source: modelParams.source,
          graph: modelParams.graph,
        };
      } else {
        initialState = state;
      }
    } catch (err) {
      history.push('/errorCatching');
    }
    return initialState;
  }

  states = (data) => {
    const { modelParams } = this.state;
    // loop over objects in data and create object in this.state
    Object.keys(modelParams).forEach((detailName) => {
      this.setState((prevState) => ({
        modelParams: {
          ...prevState.modelParams,
          [detailName]: {
            ...prevState.modelParams[detailName],
            defaultVal: data[detailName].val,
          },
        },
      }));
      // Object.keys(modelParams).forEach((item) => this.setState({ [item]: data[item] }));
    });
  };

  errors = () => {
    const { modelParams } = this.state;
    Object.keys(modelParams).forEach((item) => this.setState((prevState) => ({
      modelParams: {
        ...prevState.modelParams,
        [item]: {
          ...prevState.modelParams[item],
          errorMessage: '',
          disabledButton: false,
        },
      },
    })));
  };

  errorSubmit = () => {
    const { modelParams } = this.state;
    let ans = false;
    Object.keys(modelParams).forEach((item) => {
      ans = ans || modelParams[item].disabledButton;
    });
    return ans;
  };

  propChanged = (e) => {
    const { modelParams } = this.state;
    const { name, value } = e.target;
    const valid = this.checkValidity(name, value);
    modelParams[name].disabledButton = true;

    if (valid === OK) {
      modelParams[name].val = parseInt(value, 10);
      modelParams[name].errorMessage = '';
      modelParams[name].disabledButton = false;
      this.setState({ modelParams });
    } else if (valid === BAD_TYPE) {
      modelParams[name].errorMessage = '**Wrong Input Type';
      modelParams[name].val = modelParams[name].defaultVal;
      this.setState({ modelParams });
    } else {
      modelParams[
        name
      ].errorMessage = `**Please input a number between ${modelParams[name].lowval} and ${modelParams[name].hival}.`;
      modelParams[name].val = modelParams[name].defaultVal;
      this.setState({ modelParams });
    }

    this.setState({ disabledButton: this.errorSubmit() });
  };

  checkValidity = (name, value) => {
    const { modelParams } = this.state;
    if (
      value <= modelParams[name].hival
      && value >= modelParams[name].lowval
    ) {
      if (modelParams[name].atype === 'INT' && !!(value % 1) === false) {
        return OK;
      }
      if (modelParams[name].atype === 'DBL') {
        return OK;
      }

      return BAD_TYPE;
    }
    return OUT_OF_RANGE;
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const {
      modelParams, menuId, name, source, graph,
    } = this.state;
    const { history } = this.props;
    try {
      // res gives us back the model returned from put props
      const res = await axios.put(
        apiServer + menuId,
        modelParams,
      );
      const itemId = menuId;
      const envFile = res.data;
      const execKey = res.data.exec_key;
      history.push({
        pathname: `/models/menu/${itemId.toString(10)}`,
        state: {
          envFile,
          name,
          source,
          graph,
          execKey,
        },
      });
    } catch (e) {
      this.setState({
        serverError: true,
      });
      history.push('/errorCatching');
    }
  };

  renderHeader = () => {
    const { name } = this.state;
    return (
      <h1 className="header" style={{ textAlign: 'center', fontWeight: '200' }}>
        {`Please set the parameters for the ${name} model`}
      </h1>
    );
  };

  renderSubmitButton = () => {
    const { disabledButton } = this.state;
    // console.log(this.state);
    return (
      <button
        type="button"
        disabled={disabledButton}
        onClick={!disabledButton ? this.handleSubmit : null}
        className="btn btn-primary m-2"
      >
        Submit
      </button>
    );
  };

  goback = () => {
    const { history } = this.props;
    history.goBack();
  };

  render() {
    const { loadingData, modelParams, serverError } = this.state;
    if (serverError) {
      return <ErrorCatching />;
    }
    if (loadingData) {
      return <PageLoader />;
    }
    return (
      <div>
        <h1 className="margin-top-60"> </h1>
        {this.renderHeader()}
        <br />
        <br />
        <form>
          <div className="container">
            {Object.keys(modelParams).map((item) => {
              if (QUESTION in modelParams[item]
                 && modelParams[item][QUESTION] != null) {
                return (
                  <ModelInputField
                    label={modelParams[item].question}
                    type={modelParams[item].atype}
                    placeholder={modelParams[item].val}
                    error={modelParams[item].errorMessage}
                    propChange={this.propChanged}
                    name={item}
                    key={item}
                  />
                );
              }
              return null;
            })}
          </div>
        </form>
        <br />
        <br />
        {this.renderSubmitButton()}
      </div>
    );
  }
}

ModelDetail.propTypes = {
  history: PropTypes.shape(),
  location: PropTypes.shape({
    state: PropTypes.shape({
      menuId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      name: PropTypes.string,
      source: PropTypes.string,
      graph: PropTypes.string,
    }),
  }),
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
};

ModelDetail.defaultProps = {
  history: {},
  location: {
    state: {},
  },
  match: {
    params: {
      id: '',
    },
  },
};

export default ModelDetail;
