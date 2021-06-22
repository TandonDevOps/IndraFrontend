import React, { Component } from 'react';
import { Loader, Dimmer } from 'semantic-ui-react';
import Heading from './Heading';
import Paragraph from './Paragraph';

class ErrorCatching extends Component {
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
          text={"Indra ABM platform"}
        />
        <br />
        <br />
        <Paragraph
          text = {"We are encountering some problems with the API server. We will have this model running soon!"}
        />
        <br />
        <br />
      </div>
    );
  }
}

export default ErrorCatching;
