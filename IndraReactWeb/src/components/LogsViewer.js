import React from 'react';
import PropTypes from 'prop-types';
import CardWrapper from './CardWrapper';

const LogsViewer = ({ loadingData, environ }) => {
  if (!loadingData) return null;
  return (
    <CardWrapper title="Logs">
      <div style={{ whiteSpace: 'pre-line' }}>
        {environ.user.debug || 'Run the model to see the logs'}
      </div>
    </CardWrapper>
  );
};

LogsViewer.propTypes = {
  loadingData: PropTypes.bool,
  environ: PropTypes.shape(),
};

LogsViewer.defaultProps = {
  loadingData: true,
  environ: {},
};

export default LogsViewer;
