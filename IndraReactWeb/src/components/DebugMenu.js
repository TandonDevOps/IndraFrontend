import React, { Component } from 'react';
import config from 'IndraReactCommon/config';
import axios from 'axios';
import ListGroup from 'react-bootstrap/ListGroup';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

class DebugMenu extends Component {

  constructor(props){
    super(props);
    const {location} = this.props;
    this.debug_url = config.DEBUG_URL;
    this.state = {
      menu: {},
      EXEC_KEY: location.pathname.substr(13),
      activeDisplay: ''
    };
  }

  async componentDidMount() {
    try {
      const menu = await axios.get(`${this.debug_url}`);
      this.setState({
        menu: menu.data
      })
    } catch (e) {
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
          <ListGroup>
            {Object.keys(menu).map((id, i) => (
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
    return (
      <div>
        <h1 className="header">Debug menu</h1>
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

export default DebugMenu;