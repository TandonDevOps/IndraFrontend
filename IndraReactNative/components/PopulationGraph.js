import React, { useState, useEffect } from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';
import { VictoryChart, VictoryTheme, VictoryLine} from "victory-native";
import axios from 'axios';
import config from '../../IndraReactCommon/config'

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

const POPHIST_URL  = config.POPHIST_URL ;

function PopulationGraph(props) {

    const { popHist, grid_height} = props;
    var grid_width = 10;
    if (popHist.periods != null) grid_width = popHist.periods;
    const NUM_COLORS = 7;
    const colors = ['red', 'green', 'blue', 'black', 'purple', 'magenta', 'orange'];
    let thisColor = 0;

    const data = [];
    const env = popHist.pops;
    console.log("env:", env)
    // populate 'data' array with groups from 'pops'
    // and their respective values
    
    if (env != null) {
    Object.keys(env).forEach((group, iGroup) => {
        data.push({
        name: group,
        color: colors[thisColor % NUM_COLORS],
        //color: envFile.members[group]
            //? envFile.members[group].attrs.color : colors[thisColor % NUM_COLORS],
        data: [],
        });
        // modify individual 'data' dictionary of each pops
        // group by copying over value
        Object.keys(env[group]).forEach((member, iMember) => {
        if (env[group][iMember] != null) data[iGroup].data.push({x:iMember, y:env[group][iMember]});
        //console.log("grid_width:", grid_width)
        });
        thisColor += 1;
    });
}
    console.log("data:", data)
    if (env != null)
    return (
        <View style={styles.line}>
        <Text style={{marginTop: height*0.01, marginLeft: width*0.03}}>Population Graph:</Text>
        <VictoryChart
            theme={VictoryTheme.material}
            domain={{ x: [0, grid_width], y: [0, grid_height] }}
            height={width*0.85}
            padding={{ top: height*0.01, bottom: height*0.11, left: width*0.1, right: width*0.05 }}
            >
            {data.map((value, index) => {
                return <VictoryLine
                            style={{ data: { stroke: value.color }}}
                            data={value.data}
                            
                        />
            })}
            
            
            </VictoryChart>
    </View>
    )
    else{
        return(
            <VictoryChart
            theme={VictoryTheme.material}
            domain={{ x: [0, grid_width], y: [0, grid_height] }}
            height={width*0.85}
            padding={{ top: height*0.01, bottom: height*0.11, left: width*0.1, right: width*0.05 }}
            >
            </VictoryChart>
        )
    }


}


export { PopulationGraph };

const styles = StyleSheet.create ({
    line:{
        width: width*0.9,
        height: height*0.4,
    }
})