import React from 'react';
import ReactJson from 'react-json-view';
import propTypes from 'prop-types';
import CardWrapper from './CardWrapper';

function Debugger(props) {
  const { environ, loadingData } = props;
  const data = environ;
  if (loadingData) {
    return (
      <CardWrapper title="Model Data">
        <ReactJson src={data} />
      </CardWrapper>
    );
  }
  return null;
}

Debugger.propTypes = {
  environ: propTypes.shape(),
  loadingData: propTypes.bool,
};

Debugger.defaultProps = {
  environ: {},
  loadingData: true,
};

export default Debugger;
