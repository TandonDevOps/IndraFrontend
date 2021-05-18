import React from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';
import { Button, Icon, Header } from 'react-native-elements';
import { FontAwesome } from '@expo/vector-icons';

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

function PageHeader(props) {
    const { navigation, pageName, goBackButtonText, haveMenu } = props;
    if (haveMenu)
    return (
        <Header
            statusBarProps={{ barStyle: 'light-content' }}
            barStyle="light-content" // or directly
            leftComponent={<Button
                                icon={
                                    <Icon
                                        name="arrow-left"
                                        size={20}
                                        color='#1e90ff'
                                    />
                                }
                                title={goBackButtonText}
                                onPress={() => navigation.goBack()}
                                buttonStyle={styles.goBackButton}
                                titleStyle={{color: '#1e90ff', fontSize: width*0.045}}
                            />}
            centerComponent={<Text style= {{ 
                                        color: 'black', 
                                        fontSize: 17, 
                                        //fontWeight: "bold", 
                                        marginTop: 'auto', 
                                        marginBottom: height*0.02,
                                    }}>
                                    { pageName }
                            </Text> }
            rightComponent={<View style={styles.hamburgerMenuButton}>
                                <FontAwesome.Button
                                onPress={() => alert("The button is in dev.")}
                                name="bars"
                                color="#24A0ED"
                                backgroundColor="transparent"
                                marginLeft={10}
                                marginRight={width*0.02}
                                size={width*0.06}
                                />
                            </View>
                            }
                        
            containerStyle={{
                backgroundColor: 'white',
                //justifyContent: 'space-around',
                height: width*0.22,
                display: 'flex',
            }}
        />
    )
    else{
        return(
            <Header
            statusBarProps={{ barStyle: 'light-content' }}
            barStyle="light-content" // or directly
            leftComponent={<Button
                                icon={
                                    <Icon
                                        name="arrow-left"
                                        size={20}
                                        color='#1e90ff'
                                    />
                                }
                                title={goBackButtonText}
                                onPress={() => navigation.goBack()}
                                buttonStyle={styles.goBackButton}
                                titleStyle={{color: '#1e90ff', fontSize: width*0.045}}
                            />}
            centerComponent={<Text style= {{ 
                                        color: 'black', 
                                        fontSize: 17, 
                                        //fontWeight: "bold", 
                                        marginTop: 'auto', 
                                        marginBottom: height*0.02,
                                    }}>
                                    { pageName }
                            </Text> }
            rightComponent={<View></View>}
            containerStyle={{
                backgroundColor: 'white',
                //justifyContent: 'space-around',
                height: width*0.22,
                display: 'flex',
            }}
        />
        )
    }
}

export { PageHeader }

const styles = StyleSheet.create ({
    goBackButton: {
        width: width*0.28,
        height: width* 0.11,
        backgroundColor: 'transparent',
        alignContent: 'flex-start' 
    },
    hamburgerMenuButton: {
        height: height*0.06,
        backgroundColor: 'transparent',
    }
})