import React from 'react';
import { Route } from 'react-router';
import PropTypes from 'prop-types';
import Heading from './Heading';

import './NotFoundPage.css';

const Status = ({ code, children }) => (
  <Route
    render={({ staticContext }) => {
      if (staticContext) staticContext.status = code;
      return children;
    }}
  />
);

const NotFoundPage = () => (
  <Status code={404}>
    <div className="NotFoundPage">
      <Heading
        sectionLevel={"h1"}
        text={"Oops!"}
      />
      <div>Page not found.</div>
      <div className="action">
        <a className="btn btn-primary" href="/">
          Guide me to the right path!
        </a>
      </div>
    </div>
  </Status>
);

Status.propTypes = {
  code: PropTypes.number,
  children: PropTypes.shape(),
};

Status.defaultProps = {
  code: 0,
  children: {},
};

export default NotFoundPage;
