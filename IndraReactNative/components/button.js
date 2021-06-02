import React from 'react'
import { Text, TouchableOpacity, Alert } from 'react-native'

function ButtonUseModel(props){
    const { buttonStyle, testID, textStyle, navigationPath, navigation} = props
    console.log(navigationPath[1].modelID)
    return(
        <TouchableOpacity
            style = {buttonStyle}
            onPress={() => {if (navigationPath[1].modelID > -1) {navigation.navigate(navigationPath[0], {
                modelID: navigationPath[1].modelID, 
                modelName: navigationPath[1].modelName,
                modelGraph: navigationPath[1].modelGraph,
            })}else{
                Alert.alert("Please choose a model");
            }}
        }
            testID = {testID}>
            <Text style = {textStyle}>
                Use this model
            </Text>
        </TouchableOpacity>
    )
}

function ButtonSubmitOptions(props){
    const { buttonStyle, testID, textStyle, navigationPath, navigation} = props
    console.log("navigation[1]:", navigationPath[1])
    return(
        <TouchableOpacity
            style = {buttonStyle}
            testID = {testID}
            onPress = {() => navigation.navigate(navigationPath[0], { 
                modelParams: navigationPath[1], 
                modelID: navigationPath[2],
                modelName: navigationPath[3],
                modelGraph: navigationPath[4],
                })}>
            <Text style = {textStyle}>
                Submit
            </Text>
        </TouchableOpacity>
    )
}

export {
    ButtonUseModel, 
    ButtonSubmitOptions, 
}

//onpress = {() => navigation.navigate(navigationPath[0], navigationPath[1])}>