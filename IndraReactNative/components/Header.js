import React from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';
import { Button, Icon, Header } from 'react-native-elements';
import { FontAwesome } from '@expo/vector-icons';

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

function PageHeader(props) {
    const { navigation, modelName } = props;
    return (
        <Header
            statusBarProps={{ barStyle: 'light-content' }}
            barStyle="light-content" // or directly
            leftComponent={<Button
                                icon={
                                    <Icon
                                        name="arrow-left"
                                        size={25}
                                        color='#1e90ff'
                                    />
                                }
                                title="Properties"
                                onPress={() => navigation.goBack()}
                                buttonStyle={styles.goBackButton}
                                titleStyle={{color: '#1e90ff', fontSize: '18'}}
                            />}
            centerComponent={<Text style= {{ 
                                        color: 'black', 
                                        fontSize: 17, 
                                        //fontWeight: "bold", 
                                        marginTop: 'auto', 
                                        marginBottom: 14 
                                    }}>
                                    { modelName }
                            </Text> }
            rightComponent={<View style={styles.hamburgerMenuButton}>
                                <FontAwesome.Button
                                onPress={() => alert("hello")}
                                name="bars"
                                color="#24A0ED"
                                backgroundColor="transparent"
                                marginLeft={10}
                                />
                            </View>
                            }
            containerStyle={{
                backgroundColor: 'white',
                justifyContent: 'space-around',
                height: width*0.2
            }}
        />
    )
}

export { PageHeader }

const styles = StyleSheet.create ({
    goBackButton: {
        width: width*0.26,
        height: height*0.05,
        backgroundColor: 'transparent',
        marginBottom: 0,
        
    },
    hamburgerMenuButton: {
        backgroundColor: 'transparent',
    }
})