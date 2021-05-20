import React from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';
import { VictoryChart, VictoryTheme, VictoryScatter } from "victory-native";

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

function ScatterPlot(props){
    const { envFile, grid_height, grid_width } = props;
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
    console.log(env);
    const data = [];
    const dataset = {
        pointStyle: 'circle',
    };
    console.log("DEBUG:", env["Burned Out"])
    Object.keys(env).forEach((group, index) => {
    console.log("In forEach.", group)
      data.push({
        color: env[group].color,
        data: [],
      });
        //console.log("data: ", data);
        const markerProp = env[group].attrs.marker;
        dataset.pointStyle = markerProp in markerMap ? markerMap[env[group].attrs.marker] : 'circle';
        Object.keys(env[group].members).forEach((member) => {
        if (env[group].members[member].pos !== null) {
            data[index].data.push(
            {x: env[group].members[member].pos[0], y: env[group].members[member].pos[1]},
            );
        }
        });
    });
    //console.log("dataset: ", dataset);
    console.log("data: ", data[0]["data"]);
    return (
        <View style={styles.scatter}>
            <Text style={{marginTop: height*0.01, marginLeft: width*0.03}}>Scatter Plot:</Text>
            <VictoryChart
                theme={VictoryTheme.material}
                domain={{ x: [0, grid_width], y: [0, grid_height] }}
                height={width*0.85}
                padding={{ top: height*0.01, bottom: height*0.1, left: width*0.1, right: width*0.05 }}
                >
                {data.map((value, index) => {
                    return <VictoryScatter
                                style={{ data: { fill: data[index].color } }}
                                size={2}
                                data={data[index].data}
                                
                            />
                })}
                
                
                </VictoryChart>
        </View>
        
    );
}

export { ScatterPlot };
    
const styles = StyleSheet.create ({
    scatter:{
        width: width*0.9,
        height: height*0.4,
    }
})
