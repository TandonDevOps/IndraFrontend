import React, { Component } from 'react';
import config from 'IndraReactCommon/config';
import axios from 'axios';
import ListGroup from 'react-bootstrap/ListGroup';
import PropTypes from 'prop-types';
import ErrorCatching from './ErrorCatching';
import Heading from './Heading';
import DebugMenuResultBox from './DebugMenuResultBox';
import ViewAgentBox from './ViewAgentBox';

const BACK_ID = '-1'
const BACK_TEXT = "Back"

class DebugMenu extends Component { // from react

  constructor(props){
    super(props);
    //const {location} = this.props;
    this.debug_url = config.DEBUG_URL;
    this.state = {
      menu: {},
      modelID: this.props.modelID,
      modelName: this.props.modelName,
      EXEC_KEY: this.props.EXEC_KEY,
      handleReturn: this.props.handleReturn,
      activeDisplay: '',
      serverError: false,
    };
  }

  async componentDidMount() {
    try {
      const menu = await axios.get(`${this.debug_url}`);
      this.setState({
        menu: menu.data
      })
    } catch (e) {
      this.setState({
        serverError: true,
      });
      console.log(e);
    }
  }

  handleClick = (id) => {
    this.setState({
      activeDisplay: id,
    });
  };
  
  MenuItem = (text, url, id) => {
    const { activeDisplay } = this.state;
    return (
      <ListGroup.Item
        className="w-50 p-3 list-group-item list-group-item-action"
        as="li"
        key={id}
        active = {activeDisplay === id}
        onClick={() => {
          this.handleClick(id);
          console.log(id);
        }}
      >
        {text}
      </ListGroup.Item>
    );
  };

  renderMenuItem = () => {
    const { menu, activeDisplay, handleReturn } = this.state;
    return (
      <div className="row margin-bottom-80">
        <div className="col w-25">
          <ListGroup className="col-5">
            {Object.keys(menu).map((id) => (
              this.MenuItem(
              menu[id].question,
              menu[id].url,
              id
              )
            ))}

            <ListGroup.Item
              className="w-50 p-3 list-group-item list-group-item-action"
              as="li"
              key={BACK_ID}
              active = {activeDisplay === BACK_ID}
              onClick={handleReturn}
            >
              { BACK_TEXT }
            </ListGroup.Item>
          </ListGroup>
        </div>
      </div>
    );
  };

  renderHeader = () => {
    const { modelName } = this.state;
    return (
      <div>
        <Heading 
          sectionLevel={"h1"} 
          className={"header"} 
          text={`Debug menu for ${modelName}`}
          style={{ marginBottom: '20px' }}
        />
      </div>
    )
  }

  renderModelDetails = () => {
    const { EXEC_KEY } = this.state;
    return (
      <div>
          <DebugMenuResultBox
            EXEC_KEY={ EXEC_KEY }
            title={ "Model Details" }
            type={ "details" }
          />
      </div>
    )
  }

  renderSourceCode = () => {
    const { modelID } = this.state;
    return (
      <div>
          <DebugMenuResultBox
            modelID={ modelID }
            title={ "Source Code" }
            type={ "source" }
          />
      </div>
    )
  }

  renderAgent = () => {
    const { EXEC_KEY } = this.state;
    return (
      <div>
        <ViewAgentBox
          EXEC_KEY={ EXEC_KEY }
        />
      </div>
    )
  }

  renderRegistry = () => {
    return (
      <div>
          <DebugMenuResultBox
            title={ "Registry" }
            type={ "registry" }
          />
      </div>
    )
  }

  renderLocations = () => {
    const { EXEC_KEY } = this.state;
    return (
      <div>
          <DebugMenuResultBox
            EXEC_KEY={ EXEC_KEY }
            title={ "Locations" }
            type={ "locations" }
          />
      </div>
    )
  }

  renderPopHist = () => {
    const { EXEC_KEY } = this.state;
    return (
      <div>
          <DebugMenuResultBox
            EXEC_KEY={ EXEC_KEY }
            title={ "Population History" }
            type={ "pophist" }
          />
      </div>
    )
  }

  render() {
    const { serverError, activeDisplay } = this.state;
    if (serverError) {
      return <ErrorCatching />;
    }
    return (
      <div>
        {this.renderHeader()}
        <div>
        </div>
        {this.renderMenuItem()}
        {(activeDisplay === '1') && this.renderModelDetails()}
        {(activeDisplay === '2') && this.renderSourceCode()}
        {(activeDisplay === '3') && this.renderAgent()}
        {(activeDisplay === '4') && this.renderRegistry()}
        {(activeDisplay === '5') && this.renderLocations()}
        {(activeDisplay === '6') && this.renderPopHist()}
      </div> 
    );
  }
}

DebugMenu.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }),
};

DebugMenu.defaultProps = {
  location: {
    pathname: '',
  },
};

export default DebugMenu;
