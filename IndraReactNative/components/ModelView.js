import React, { Component } from 'react';
import { View, Text, Dimensions, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { Button, Input, Icon } from 'react-native-elements';
import axios from 'axios';
import { ScrollView, TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';
import Spinner from 'react-native-loading-spinner-overlay';
import { FontAwesome } from '@expo/vector-icons';
//import { setTimeout } from 'timers'
import config from '../../IndraReactCommon/config'
import { PageHeader } from './Header.js'
import { ScatterPlot } from './ScatterPlot'
import { PopulationGraph } from './PopulationGraph.js'


var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

class ModelView extends Component {
    constructor(props) {
        super(props);
        const { route, navigation } = this.props;
        this.state = {modelParams: route.params.modelParams, 
                      modelID: route.params.modelID, 
                      modelName: route.params.modelName, 
                      modelGraph: route.params.modelGraph,
                      selectedModel: 0, 
                      periodNum: 10,
                      ready: false, 
                      runModelLoading: false,
                      modelWorking: true,
                      runMenuOpen: false,
                      continuousRun: false,
                      popHist: {},
                      totalRunPeriod: 0
                    };
        this.props_url = config.PROPS_URL;
        this.menu_url = config.MENU_URL;
        this.run_url = config.RUN_URL;
        this.pophist_url = config.POPHIST_URL;
        this.graphs = ["population graph", "scatter plot", "bar graph"];
        this.goBackButtonText = "Properties";
        this.updateModelId = this.updateModelId.bind(this);
        this.modelExist = this.modelWorking.bind(this);
        this.handleRunPeriod = this.handleRunPeriod.bind(this);
        this.sendNumPeriods = this.sendNumPeriods.bind(this);
        this.updateGraph = this.updateGraph.bind(this);
        this.toggleRunMenu = this.toggleRunMenu.bind(this);
        this.continuousRun = this.continuousRun.bind(this);
        this.stopRun = this.stopRun.bind(this);
        this.timeout = this.timeout.bind(this);
        
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
            return axios.get(`${this.pophist_url}${this.state.exec_key}`)
        })
        .then((res) => {
            console.log("first fetched data:", res.data);
            this.setState({popHist: res.data.pops})
        })
        .catch(error => console.error(error));
        if(this.state.modelGraph == "scatter") this.setState({selectedModel: 1})
        else this.setState({selectedModel: 0});
        this.setState({ready: true});
        
    }

    updateGraph = async () => {
        console.log("in update Graph")
        if(this.state.selectedModel == 1){
            var temp;
            //this.setState({ready: false})
            let params = await axios
            .put(`${this.props_url}${this.state.modelID}`, this.state.modelParams)
            .then((response) => {
                temp = response.data
                this.setState({envFile: temp, exec_key: temp.exec_key});
                //console.log("fetched scatter data")
            })
            .catch(error => console.error(error));
        }
        else{
        axios
        .get(`${this.pophist_url}${this.state.exec_key}`)
        .then((res) => {
            //console.log("fetched data:", res.data);
            this.setState({popHist: res.data.pops})
        })
        .catch(error => console.error(error));
        }
        
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
        const { periodNum, totalRunPeriod, envFile } = this.state;
        //totalRunPeriod = totalRunPeriod + periodNum
        console.log("periodNum:", periodNum);
        this.setState({ runModelLoading: true });
        console.log("runModelLoading:", this.state.runModelLoading);
        console.log("Run model loading:", this.state.runModelLoading)
        if (this.state.selectedModel == 1){
            let res = await axios.put(
                `${this.run_url}${periodNum}`,
                envFile
            )
            .then((res) => {this.setState({
                envFile: res.data,
                msg: res.data.user.user_msgs,
                runModelLoading: false,
                totalRunPeriod: totalRunPeriod,
            })
            });
        }
        else{
            let res = await axios.put(
                `${this.run_url}${periodNum}`,
                envFile
            )
            .then((res) => {this.setState({
                envFile: res.data,
                msg: res.data.user.user_msgs,
                runModelLoading: false,
                totalRunPeriod: totalRunPeriod,
                exec_key: res.data.exec_key
            });
            return axios.get(`${this.pophist_url}${this.state.exec_key}`, )
            })
            .then((res) => {
                this.setState({
                    popHist: res.data
                })
            })
        }
        
    }

    handleRunPeriod = (n) => {
        this.setState({
            periodNum: n,
          });
        console.log("In handleRunPeriod:", this.state.periodNum)
    }

    toggleRunMenu = () => {
        var newState = !this.state.runMenuOpen;
        this.setState({runMenuOpen: newState})
    }

    timeout(ms) { //pass a time in milliseconds to this function
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    fetchPopHist = async () => {
        console.log("fetching...")
        let res = await axios.get(`${POPHIST_URL}${EXEC_KEY}`)
        .then((res) => {this.setState({popHist: res.data.pops})});
    }

    async continuousRun (){
        await this.setState({periodNum: 1, continuousRun: true});
        while(this.state.continuousRun){
            await this.sendNumPeriods(1);
            this.timeout(2000);
        }
        
      }
    
      stopRun = () => {
        this.setState({continuousRun: false});
      }


    render(){
        console.log("totalRunPeriod:", this.state.totalRunPeriod);
        console.log("exec_key:", this.state.exec_key)
        console.log("popHist:", this.state.popHist)
        var grid_height, grid_width = 0;
        try {grid_height = this.state.modelParams.grid_height.val;}
        catch {grid_height = 30}
        try {grid_width = this.state.modelParams.grid_width.val;}
        catch {grid_width = 20}
        var graph = <ScatterPlot
                        envFile={this.state.envFile}
                        grid_height={grid_height}
                        grid_width={grid_width}
                    />
        var populationGraph = <PopulationGraph
                                popHist={this.state.popHist}
                                grid_height={grid_height}
                                grid_width={grid_width}
                            />
        if (this.state.selectedModel == 0) graph = populationGraph;
        
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
                    options={this.graphs}
                    selectedModel={this.state.selectedModel}
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
                    {graph}
                </View>

                
                {this.state.runMenuOpen == true? 
                    <View style={styles.runMenu}>
                        <Button
                            title="Continuous Run"
                            onPress={ this.continuousRun }
                            buttonStyle={styles.continuousRunButton}
                            titleStyle={{
                                fontSize: 15,
                            }}
                        />
                        <Button
                            title="Stop"
                            onPress={ this.stopRun }
                            buttonStyle={styles.stopButton}
                            titleStyle={{
                                fontSize: 15,
                            }}
                        />
                        <View style={{marginTop: height*0.03, marginLeft: width*0.02, underlayColor:'transparent', backgroundColor:'transparent'}}>
                            <FontAwesome.Button
                                name="retweet"
                                size={16}
                                color="#24A0ED"
                                underlayColor='transparent'
                                backgroundColor='transparent'
                                onPress={this.toggleRunMenu}
                            />
                        </View>
                    </View> 
                    :<View style={styles.rowRun}>
                    <TouchableOpacity onLongPress={ this.toggleRunMenu } onPress={ this.sendNumPeriods }>
                    <Button
                        title="run"
                        buttonStyle={styles.runButtonSingle}
                        titleStyle={{
                            fontSize: 15,
                        }}
                    />
                    </TouchableOpacity>
                    
                    <Text style={styles.runText}>model for</Text>
                    <Input
                        type="INT"
                        placeholder="10"
                        onChangeText={ (n) => this.handleRunPeriod(n) }
                        containerStyle={styles.input}
                    />
                    <Text style={styles.runText}>periods.</Text>
                    <View 
                        style={{marginTop: height*0.03, marginLeft: width*0.02, backgroundColor:'transparent'}}
                        
                        >
                        <FontAwesome.Button
                                name="retweet"
                                size={16}
                                color="#24A0ED"
                                underlayColor="transparent"
                                backgroundColor="transparent"
                                onPress={this.toggleRunMenu}
                            />
                    </View>
                </View>}
                
                    
                {(this.state.runModelLoading == true & this.state.continuousRun == false)?
                    <View style={styles.spinnerContainer}>
                        <Spinner
                            visible={this.state.runModelLoading}
                            textContent={'Loading...'}
                            textStyle={styles.spinnerTextStyle}
                            />
                    </View>: null
                }

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
    runButtonSingle: {
        backgroundColor: '#00b300',
        height: height*0.05,
        width: width*0.2,
        marginRight: width*0.02,
        marginLeft: width*0.06,
        marginTop: height*0.03,
        padding: 0,
    },
    runButton: {
        backgroundColor: '#00b300',
        height: height*0.05,
        width: width*0.2,
        
        marginRight: width*0.02,
        marginLeft: width*0.03,
        marginTop: height*0.03,
        padding: 0,
    },
    continuousRunButton: {
        backgroundColor: '#00b300',
        height: height*0.05,
        width: width*0.5,
        marginRight: width*0.02,
        marginLeft: width*0.072,
        marginTop: height*0.03,
        padding: 0,
    },
    stopButton: {
        backgroundColor: '#c82333',
        height: height*0.05,
        width: width*0.2,
        marginRight: width*0.02,
        //marginLeft: width*0.05,
        marginTop: height*0.03,
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
        zIndex: 0,
        backgroundColor: 'transparent'
    },
    runMenu: {
        flexDirection: "row",
        position: 'absolute',
        backgroundColor: 'transparent',
        height: height*1,
        width: width*1,
        marginTop: height*0.9,
        zIndex: 200,
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
