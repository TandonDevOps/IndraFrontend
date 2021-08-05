import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import styled, { withTheme } from 'styled-components';
import Layout from './components/Layout';
import Home from './components/Home';
import WIP from './components/WIP';
import ModelParams from './components/ModelParams';
import RunModel from './components/RunModel';
import NotFoundPage from './components/NotFoundPage';
import ErrorCatching from './components/ErrorCatching';
import DebugMenu from './components/DebugMenu';
import autoBind from 'react-autobind';

// The styling below should be in a style sheet, not in javascript:
const Wrapper = styled('div')`
  background: ${(props) => props.theme.background};
  width: 100vw;
  min-height: 100vh;
  font-family: -apple-stem, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen";
  h1 {
    color: ${(props) => props.theme.body};
  }
`;

class App extends React.Component {

  constructor(props) {
    super(props);
    autoBind(this);
  }

  componentDidMount() {
    window.history.pushState(null, document.title, window.location.href);
    window.addEventListener('popstate', function (event){
      window.history.pushState(null, document.title,  window.location.href);
    });
  }

  indraRoutes() {
    return (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/wip" component={WIP} />
        <Route exact path="/models/props/:id" component={ModelParams} />
        <Route exact path="/models/menu/:id" component={RunModel} />
        <Route exact path="/models/debug/:id" component={DebugMenu} />
        <Route exact path="/errorCatching" component={ErrorCatching} />
        <Route component={NotFoundPage} />
      </Switch>
    );
  }

  render() {
    return (
      <Wrapper>
        <HashRouter>
          <Layout>
            {this.indraRoutes()}
          </Layout>
        </HashRouter>
      </Wrapper>
    );
  }
}


export default withTheme(App);
