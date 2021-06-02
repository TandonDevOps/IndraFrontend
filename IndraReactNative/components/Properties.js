import React, { Component } from 'react'
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native'
import { Input, Header, Icon, Button } from 'react-native-elements'
import axios from 'axios'
import config from '../../IndraReactCommon/config'
import { ButtonSubmitOptions } from './button.js'
import { PageHeader } from './Header.js'
import { Logs } from 'expo'

//Logs.enableExpoCliLogging() //enable the logs in expo cli

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;



class Properties extends Component {
    constructor(props) {
        super(props);
        const {route, navigation} = this.props;
        this.props_url = config.PROPS_URL;
        this.state = { modelID : route.params.modelID, 
                       modelName: route.params.modelName, 
                       modelGraph: route.params.modelGraph, 
                       menuDetails : {}, 
                       loadingText : 'loading properties...', 
                       ready : false};
        this.props_url = config.PROPS_URL;
        this.goBackButtonText = "Menu";
        this.updateJson = this.updateJson.bind(this);
    }

    async componentDidMount(){
        let properties = await axios.get(`${this.props_url}${this.state.modelID}`);
        this.setState( { modelDetails : properties.data, ready : true });
        //this.setState( { ready: true } );
        /*try{
            axios.get(`${this.props_url}${this.state.modelID}`)
            .then((res) => {
                console.log(res);
                this.setState({ready: true});
            });
        } catch(e) {
            console.log(e);
        }*/
        console.log("hi");
    }



    updateJson(key, param){
        let properties = this.state.modelDetails
        properties[key]["val"] = Number(param)
        //this.setState({modelNewDetails: properties})
        //console.log(this.state.modelDetails)
        //console.log(this.state.modelNewDetails)
    }

    render() {
        const ready = this.state.ready;
        let t = <Text>{this.state.loadingText}</Text>;
        if(ready){
            /*t = <Form>
                <View className="container">
                {Object.keys(this.state.modelDetails).map((item) => {
                    return (
                        <ModelInputfield
                        label={this.state.modelDetails[item].question}
                        type={this.state.modelDetails[item].atype}
                        placeholder={this.state.modelDetails[item].val}
                        //error={this.state.modelDetails[item].errorMessage}
                        //propChange={this.propChanged}
                        name={item}
                        key={item}
                        />
                    );

                    return(
                        <Text></Text>
                    );
                })}
                </View>
            </Form>*/

            /*let texto = JSON.stringify(this.state.modelDetails);
            t = <Text>
                {texto}
            </Text>*/
            const mTestID = "submitTest"
            t = <View className="container">
                {Object.keys(this.state.modelDetails).map((key) => {
                    var item = this.state.modelDetails[key]
                    if(item.question != null){
                        return(
                            <>
                                <Input 
                                label={item.question}
                                placeholder={String(item.val)}
                                onChangeText={(param) => this.updateJson(key, param)}
                                />
                            </>
                        );
                    }else{
                        return <></>
                    }
                })}
                <ButtonSubmitOptions testID={mTestID}
                textStyle={styles.buttonText}
                buttonStyle={styles.button}
                navigationPath={['ModelView', this.state.modelDetails, this.state.modelID, this.state.modelName, this.state.modelGraph] }
                navigation={this.props.navigation}
                />
                
            </View>
        }

        return (
            <View>
                <PageHeader
                    navigation={this.props.navigation}
                    pageName="Properties"
                    goBackButtonText={this.goBackButtonText}
                    haveMenu={false}
                />
                <ScrollView contentInset={{top:10,bottom:50}} style={styles.scrollConainer}>
                    {t}
                </ScrollView>
            </View>
        );
    }
}


/*function Properties({route, navigation}) {
    const { modelID } = route.params
    
    return (
        <View>
            <Text>ModelID: {modelID}</Text>
        </View>
    );
    
 }*/
 export default Properties

 const styles = StyleSheet.create ({
    button: {
        padding: 10,
        marginHorizontal: width * 0.1,
        width: width * 0.8,
        height: height * 0.06,
        marginTop: 9,
        backgroundColor: '#3399ff',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontSize: height * 0.02
    },
    scrollConainer: {
        height: height * 0.8,
    },
    goBackButton: {
        width: width*0.18,
        height: height*0.05,
        backgroundColor: 'transparent',
        marginLeft: 'auto'
    }
 })
//onChangeText={(param) => this.updateJson(key, param)}