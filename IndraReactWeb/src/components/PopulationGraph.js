import React, { useState, useEffect } from 'react';
import { LineChart } from 'react-chartkick';
import 'chart.js';
import PropType from 'prop-types';
import CardWrapper from './CardWrapper';
import axios from 'axios';
import config from 'IndraReactCommon/config';
import ErrorCatching from './ErrorCatching';

const POPHIST_URL  = config.POPHIST_URL ;

function PopulationGraph(props) {
  const [popHist, setPopHist] = useState({});
  const { loadingData, EXEC_KEY } = props;
  useEffect(() => {
    async function fetchPopHist() {
      try {
        const res = await axios.get(`${POPHIST_URL}${EXEC_KEY}`);
        setPopHist(res.data.pops);
      } catch (e) {
        return <ErrorCatching />;
      }
    }

    fetchPopHist();
  }, [props, EXEC_KEY]);

  const NUM_COLORS = 7;
  const colors = ['red', 'green', 'blue', 'black', 'purple', 'magenta', 'orange'];
  let thisColor = 0;
  if (loadingData) {
    const data = [];
    const env = popHist;
    // populate 'data' array with groups from 'pops'
    // and their respective values
    Object.keys(env).forEach((group, iGroup) => {
      data.push({
        name: group,
        color: colors[thisColor % NUM_COLORS],
        //color: environ.members[group]
          //? environ.members[group].attrs.color : colors[thisColor % NUM_COLORS],
        data: {},
      });
      // modify individual 'data' dictionary of each pops
      // group by copying over value
      Object.keys(env[group]).forEach((member, iMember) => {
        data[iGroup].data[member] = env[group][iMember];
      });
      thisColor += 1;
    });
    return (
      <CardWrapper title="Population Graph">
        <LineChart data={data} width="600px" height="600px" xtitle="Period" ytitle="Population" />
      </CardWrapper>
    );
  }
  return null;
}

PopulationGraph.propTypes = {
  loadingData: PropType.bool,
  EXEC_KEY: PropType.number
};

PopulationGraph.defaultProps = {
  loadingData: true,
  EXEC_KEY: 0
};

export default PopulationGraph;
