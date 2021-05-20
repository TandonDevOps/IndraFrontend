import React, { Component } from 'react';
import { View, Text, Dimensions, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { Button, Input } from 'react-native-elements';
import axios from 'axios';
import { ScrollView } from 'react-native-gesture-handler';
import Spinner from 'react-native-loading-spinner-overlay';
import config from '../../IndraReactCommon/config'
import { PageHeader } from './Header.js'
import { ScatterPlot } from './ScatterPlot'


var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

class ModelView extends Component {
    constructor(props) {
        super(props);
        const { route, navigation } = this.props;
        this.state = {modelParams: route.params.modelParams, 
                      modelID: route.params.modelID, 
                      modelName: route.params.modelName, 
                      selectedModel: 0, 
                      periodNum: 10,
                      ready: false, 
                      runModelLoading: false,
                      modelWorking: true,
                    };
        this.props_url = config.PROPS_URL;
        this.menu_url = config.MENU_URL;
        this.run_url = config.RUN_URL;
        this.graphs = ["population graph, scatter plot, bar graph"];
        this.goBackButtonText = "Properties";
        this.updateModelId = this.updateModelId.bind(this);
        this.modelExist = this.modelWorking.bind(this);
        this.handleRunPeriod = this.handleRunPeriod.bind(this);
        this.sendNumPeriods = this.sendNumPeriods.bind(this);
        this.updateGraph = this.updateGraph(this);
    }

    async componentDidMount(){
        var temp;
        let params = await axios
        .put(`${this.props_url}${this.state.modelID}`, this.state.modelParams)
        .then((response) => {
            temp = response.data
            this.setState({envFile: temp, exec_key: temp.exec_key});
            return axios.get(`${this.menu_url}`);
        })
        .then((response) => {
            temp = JSON.stringify(response.data);
            
            this.setState({models: temp, ready: true});
            if (response.data[1].active === false) this.setState({modelWorking: false});
        })
        .catch(error => console.error(error));
        this.setState({ready: true});
        
    }

    updateGraph = async () => {
        var temp;
        //this.setState({ready: false})
        let params = await axios
        .put(`${this.props_url}${this.state.modelID}`, this.state.modelParams)
        .then((response) => {
            temp = response.data
            this.setState({envFile: temp, exec_key: temp.exec_key});
        })
        .catch(error => console.error(error));
    }

    updateModelId (modelId) {
        this.setState({selectedModel: modelId});
        this.modelWorking(modelId);
      }

    modelWorking (modelId) {
        var obj = JSON.parse(this.state.models);
        if (obj[modelId+1].active === false) this.setState({modelWorking: false});
        else this.setState({modelWorking: true});
    }

    sendNumPeriods = async () => {
        
        const { periodNum, envFile } = this.state;
        //("RUNNING:", envFile, "periodNum:", periodNum);
        this.setState({ runModelLoading: true });
        let res = await axios.put(
            `${this.run_url}${periodNum}`,
            envFile
          )
        .then((res) => {this.setState({
            envFile: res.data,
            runModelLoading: false,
            msg: res.data.user.user_msgs,
          })})
    }

    handleRunPeriod = (n) => {
        this.setState({
            periodNum: n,
          });
    }

    


    render(){
        //console.log("envFile:", this.state.envFile);
        const grid_height = this.state.modelParams.grid_height.val;
        const grid_width = this.state.modelParams.grid_width.val;
        if(this.state.ready != true) return <View style={styles.spinnerContainer}>
                                                <Spinner
                                                    visible={!this.state.ready}
                                                    textContent={'Loading...'}
                                                    textStyle={styles.spinnerTextStyle}
                                                    />
                                            </View>;
        else{

        return(
            <View>
                <PageHeader
                    navigation={this.props.navigation}
                    pageName="Model View"
                    goBackButtonText={this.goBackButtonText}
                    haveMenu={true}
                />

                <View style={{zIndex:-10}}>
                    <Text style={styles.modelStatus}>Model Status:</Text>

                    <View style={styles.modelStatusContainer}>
                        <ScrollView>
                            <Text style={styles.modelStatus} onChange={this.updateGraph}>{this.state.msg}</Text>
                        </ScrollView>
                    </View>
                </View>

                <View style={{zIndex:-10}}>
                    <ScatterPlot
                        envFile={this.state.envFile}
                        grid_height={grid_height}
                        grid_width={grid_width}
                    />
                </View>

                

                <View style={styles.rowRun}>
                    <Button
                        title="run"
                        onPress={ this.sendNumPeriods }
                        buttonStyle={styles.runButton}
                    />
                    
                    <Text style={styles.runText}>model for</Text>
                    <Input
                        type="INT"
                        placeholder="10"
                        onChangeText={ (n) => this.handleRunPeriod(n) }
                        containerStyle={styles.input}
                    />
                    <Text style={styles.runText}>periods.</Text>
                </View>
                    
                {this.state.runModelLoading == true?<View style={styles.spinnerContainer}>
                                                    <Spinner
                                                        visible={this.state.runModelLoading}
                                                        textContent={'Loading...'}
                                                        textStyle={styles.spinnerTextStyle}
                                                        />
                                                    </View>: null}

            </View>
        )}
    }

}

export default ModelView

const styles = StyleSheet.create ({
    /*titleText: {
        fontSize: 30,
        fontWeight: "bold",
        fontFamily: 'Arial'
    },*/
    buttonContainer: {
        backgroundColor: '#f8f8f0'
    },
    input: {
        width: width*0.2,
        marginTop: height*0.015,
    },
    runButton: {
        backgroundColor: '#00b300',
        height: height*0.05,
        width: width*0.2,
        //size: 15,
        marginRight: width*0.02,
        marginLeft: width*0.05,
        marginTop: height*0.02,
        padding: 0,
    },
    runText: {
        fontSize: width*0.04,
        marginTop: height* 0.04,
    },
    rowRun: {
        flexDirection: "row",
        position: 'absolute',
        marginTop: height*0.9,
    },
    modelStatus: {
        marginTop: height*0.01,
        marginLeft: width*0.03,
    },
    modelStatusContainer: {
        borderRadius:2,
        borderColor:"grey", 
        borderWidth:3, 
        opacity:0.9, 
        height:height/3.5, 
        margin:width*0.02,
    },
    spinnerTextStyle: {
        color: '#616161',
    },
    spinnerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
      },
})
