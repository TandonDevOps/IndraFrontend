import React, { Component } from 'react'
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native'
import { Dropdown } from 'react-native-material-dropdown-v2';
import axios from 'axios'
import config from '../../IndraReactCommon/config'
import { Paragraph } from 'react-native-paper';
import { ButtonUseModel } from './button.js'

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

export const TITLE_TEXT = "titleText"
export const DROPDOWN_BOX = "dropdownBox"
export const CONFIRM_BUTTON = "confirmButton"


class Menu extends Component {
    
    constructor(props) {
        super(props);
        this.state = {names: [], 
                      title: "-Indra ABM Models-", 
                      dropdown: [], 
                      curID: -1, 
                      curName: "", 
                      curDoc: "Choose a model to show description.", 
                      curGraph: ""}
        this.api_server = config.API_URL;
        this.alertModelName = this.alertModelName.bind(this);
        this.onDropdownChange = this.onDropdownChange.bind(this);
    }
    
    componentDidMount(){
        try{
            axios.get(`${this.api_server}models?active=true`)
            .then((res) => {
                var r = res.data;
                console.log(res.data)
                var activeNames = [];
                r.forEach((item, index) => {
                    if(item.active){
                        activeNames.push(item);
                    }
                });
                this.setState({names : activeNames});

                //arr for dorpdown
                var arr = [];
                r.forEach((item, index) => {
                    if(item.active){
                        arr.push({value: item.name});
                    }
                });
                this.setState({dropdown: arr})
            });
        } catch(e) {
            console.log(e);
        }
    }

    //Change model description after select a model in the dropdown
    onDropdownChange(text, index, dat){
        var curModel = this.state.names[index];
        this.setState({curID: curModel.modelID, curName: curModel.name, curDoc: curModel.doc, curGraph: curModel.graph});
    }

    alertModelName = async () => {
        alert(this.state.curID);
    }

    render() {
        return (
        <View style={styles.appContainer}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom: 50}} style = {styles.scroll}>
            <Text 
                style={styles.titleText}
                testID={TITLE_TEXT}>
                {this.state.title}
            </Text>
            <Dropdown
                label='Choose a model:'
                data={this.state.dropdown}
                itemCount= {4}
                dropdownOffset={styles.dropdownOffset}
                dropdownPosition= {1}
                containerStyle={styles.containerStyle}
                onChangeText = {this.onDropdownChange}
                testID={DROPDOWN_BOX}
            />
            <Paragraph style={styles.doctext}>
                {this.state.curDoc}
            </Paragraph>
            <ButtonUseModel
                buttonStyle = {styles.button}
                testID = {CONFIRM_BUTTON}
                textStyle = {styles.buttonText}
                navigationPath={['Properties', {modelID: this.state.curID, modelName: this.state.curName, modelGraph: this.state.curGraph}]}
                navigation = {this.props.navigation}
            />
            </ScrollView>
        </View>
        )
    }
 }
 export default Menu
 
 const styles = StyleSheet.create ({
    appContainer: {
        flex: 1,
        backgroundColor: '#ecf4f4',
        alignItems: 'center',
        justifyContent: 'center',
        
    },
    scroll: {
        marginTop: height * 0.05,
        height: '100%',
    },
    titleText: {
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: height *0.05,
        marginBottom: height * 0.02,
    },
    doctext: {
        padding: 10,
        paddingHorizontal: width * 0.07,
        height: height*0.1,
    },
    dropdownOffset: {
        top: height * 0.14, 
        left: - width * 0.01
    },
    containerStyle: {
        width: width * 0.8,
        marginHorizontal: width * 0.07
    },
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
    }
 })
