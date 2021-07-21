import React, { Component } from 'react';
import { Loader, Dimmer } from 'semantic-ui-react';
import { Dropdown } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Carousel from './Carousel';
import sandpileImg from './images/Sandpile.jpg';
import sandpile1Img from './images/sandpile_2.png';
import mandelobrotImg from './images/mendelobrot_sq.jpg';
import './styles.css';
import axios from 'axios';
import ErrorCatching from './ErrorCatching';
import Heading from './Heading';

//import { getModels } from 'IndraReactCommon/APICalls';
import config from 'IndraReactCommon/config';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allItems: [],
      loadingData: false,
      apiFailed: false,
      dataForCarousel: [
        { image: sandpileImg, title: 'by Seth Terashima' },
        { image: sandpile1Img, title: 'by Colt Browninga' },
        { image: mandelobrotImg, title: 'by Adam Majewski' },
      ],
      serverError: false,
    };
    this.api_server = config.API_URL;
  }
 

  async componentDidMount() {
    const { history } = this.props;
    try {
      this.setState({ loadingData: true });
      document.title = 'Home';
      const res = await axios.get(`${this.api_server}models?active=true`);
      // let models = await getModels();
      this.setState({ allItems: res.data, loadingData: false });
      // setting this so model properties like name, graph etc are access
      // in all tabs of a browser
      localStorage.setItem('indra_model_details', JSON.stringify(res.data));
    } catch (e) {
      this.setState({
        serverError: true,
      });
      history.push('/errorCatching');
    }
  }

  renderChooseModelProp = () => (
    <Heading
      sectionLevel={"h1"}
      className={"small-header"}
      text={"Please choose a model: "}
      style={{ marginBottom: '15px' }}
    />
  );

  render() {
    const {
      loadingData, dataForCarousel, allItems, apiFailed, serverError,
    } = this.state;
    if (serverError) {
      return <ErrorCatching />;
    }
    if (apiFailed) {
      return <Heading
        sectionLevel={"h1"}
        text={"404 Error"}
      />;
    }
    if (loadingData) {
      return (
        <Dimmer active inverted>
          <Loader size="massive">Loading...</Loader>
        </Dimmer>
      );
    }
    return (
      <div className="container">
        <div className="margin-bottom-80">
          <Heading
            sectionLevel={"h1"}
            className={"text-left"}
            text={"Indra Agent-Based Modeling System"}
          />
        </div>
        <div className="row">
          <Col sm={12} lg={4} className="mb-5">
            {this.renderChooseModelProp()}
            <Dropdown>
              <Dropdown.Toggle variant="outline-dark" id="dropdown-basic">
                Choose...
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {Object.keys(allItems).map((item) => (!('active' in allItems[item])
                  || allItems[item].active === true ? (
                    <OverlayTrigger
                      key={`${allItems[item].name}-tooltip`}
                      placement="right"
                      overlay={<Tooltip>{allItems[item].doc}</Tooltip>}
                    >
                      <Link
                        to={{
                          pathname: `/models/props/${allItems[item].modelID}`,
                          state: {
                            menuId: allItems[item].modelID,
                            name: allItems[item].name,
                            source: allItems[item].source,
                            graph: allItems[item].graph,
                          },
                        }}
                        className="link text-dark dropdown-item"
                        key={allItems[item].name}
                      >
                        {allItems[item].name}
                      </Link>
                    </OverlayTrigger>
                  ) : null))}
              </Dropdown.Menu>
            </Dropdown>
          </Col>
          <Col sm={12} lg={{ cols: 6, span: 6, offset: 2 }}>
            <Carousel
              speed={5000}
              autoplay
              className="col"
              data={dataForCarousel}
            />
          </Col>
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  history: PropTypes.shape(),
};

Home.defaultProps = {
  history: {},
};

export default Home;
