import React, { Component } from 'react';
import config from 'IndraReactCommon/config';
import axios from 'axios';
import ListGroup from 'react-bootstrap/ListGroup';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import PropTypes from 'prop-types';
import ErrorCatching from './ErrorCatching';
import Heading from './Heading';
import Source from './Source';


class DebugMenu extends Component { // from react

  constructor(props){
    super(props);
    const {location} = this.props;
    this.debug_url = config.DEBUG_URL;
    this.state = {
      menu: {},
      modelID: location.pathname.substr(13),
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

  render() {
    const { modelID, serverError, activeDisplay } = this.state;
    if (serverError) {
      return <ErrorCatching />;
    }
    if (activeDisplay === '2') {
      return <Source modelID={ modelID }/>;
    }
    return (
      <div>
        <Heading 
          sectionLevel={"h1"} 
          className={"header"} 
          text={"Debug menu"}
          style={{ marginBottom: '20px' }}
        />
        <div>
        </div>
        <ul className="list-group">
          <div className="row">
          </div>
        </ul>
        {this.renderMenuItem()}
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
