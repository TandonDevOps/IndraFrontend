import React, { Component } from 'react';
import { Loader, Dimmer } from 'semantic-ui-react';
import Heading from './Heading';

class WIP extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingData: false,
    };
  }

  async componentDidMount() {
    this.setState({ loadingData: true });
    document.title = 'Indra | Work in Progress';
    this.setState({ loadingData: false });
  }

  render() {
    const { loadingData } = this.state;
    if (loadingData) {
      return (
        <Dimmer active inverted>
          <Loader size="massive">Loading...</Loader>
        </Dimmer>
      );
    }

    return (
      <div>
        <br />
        <Heading
          sectionLevel={"h1"}
          style={{ textAlign: 'center' }}
          text={"Welcome to the Indra ABM platform!"}
        />
        <br />
        <br />

        <p>We will have this model running soon!</p>

        <br />
        <br />
      </div>
    );
  }
}

export default WIP;
