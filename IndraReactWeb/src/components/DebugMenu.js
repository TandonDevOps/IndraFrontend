import React, { Component } from 'react';
import config from 'IndraReactCommon/config';
import axios from 'axios';
import ListGroup from 'react-bootstrap/ListGroup';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import PropTypes from 'prop-types';
import ErrorCatching from './ErrorCatching';
import Heading from './Heading';
import DebugMenuResultBox from './DebugMenuResultBox';


class DebugMenu extends Component { // from react

  constructor(props){
    super(props);
    const {location} = this.props;
    this.debug_url = config.DEBUG_URL;
    this.state = {
      menu: {},
      modelID: this.props.modelID,
      modelName: this.props.modelName,
      EXEC_KEY: this.props.EXEC_KEY,
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
      <OverlayTrigger
        key={id}
        placement="right"
        overlay={<Tooltip>{"This feature is under development."}</Tooltip>}
      >
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
      </OverlayTrigger>
      
    );
  };

  renderMenuItem = () => {
    const { menu } = this.state;
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
        {(activeDisplay === '2') && this.renderSourceCode()}
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
