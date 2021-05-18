import React from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';
import ScatterChart from 'react-native-scatter-chart';

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

function ScatterPlot(props){
    const { envFile } = props;
    console.log("\n\n########Scatter Plot#########\n\n");
    const pointStyles = [
        'circle',
        'cross',
        'crossRot',
        'dash',
        'line',
        'rect',
        'rectRounded',
        'rectRot',
        'star',
        'triangle',
      ];
      const markerMap = {
        tree: 'triangle',
        square: 'rect',
        person: 'circle',
        deceased: 'circle',
        circle: 'circle',
        default: 'circle',
      };
      
    const env = envFile.env.members;
    const data = [];
    const dataset = {
        pointStyle: 'circle',
    };
    Object.keys(env).forEach((group, iGroup) => {
        data.push({
        color: env[group].color,
        unit: '%',
        values: [],
        });
        const markerProp = env[group].attrs.marker;
        dataset.pointStyle = markerProp in markerMap ? markerMap[env[group].attrs.marker] : 'circle';
        Object.keys(env[group].members).forEach((member) => {
        if (env[group].members[member].pos !== null) {
            data[iGroup].values.push(
            env[group].members[member].pos,
            );
        }
        });
    });
    console.log("dataset: ", dataset);
    console.log("data: ", data);
    return (
        <View style={styles.scatter}>
            <Text style={{marginBottom: 10}}>Scatter Plot:</Text>
            <ScatterChart
                backgroundColor='transparent'
                data={data}
                chartHeight={height*0.4}
                chartWidth={width*0.9}
                minX={0}
                minY={0}
                horizontalLinesAt={[0,10,20,30,40]}
                verticalLinesAt={[0,10,20,30,40]}
            />
        </View>
        
    );
}

export { ScatterPlot };
    
const styles = StyleSheet.create ({
    scatter:{
        margin: width*0.05
    }
})
