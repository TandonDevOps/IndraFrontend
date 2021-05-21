import React, { useState } from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';
import { Button, Icon, Header, Card } from 'react-native-elements';
import { FontAwesome } from '@expo/vector-icons';

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

function PageHeader(props) {
    const { navigation, pageName, goBackButtonText, haveMenu } = props;
    const [menuOpen, setOpen] = useState(0);
    const options = ['Population Graph', 'Scatter Plot', 'Debug Menu'];
    if (haveMenu)
    return (
        <View>
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
                                onPress={() => (setOpen(1))}
                                name="bars"
                                color="#24A0ED"
                                backgroundColor="transparent"
                                marginLeft={10}
                                marginRight={width*0.02}
                                size={width*0.06}
                                underlayColor='transparent'
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
        {menuOpen == 1? <Card containerStyle={styles.cardContainer}>
                        <View style={{flexDirection: "row"}}>
                            <Card.Title style={{marginTop: height*0.008, marginLeft: width*0.22}}>OPTIONS</Card.Title>
                            <Button 
                                icon={
                                    <Icon
                                    name="close"
                                    size={15}
                                    color="black"
                                    />
                                }
                                buttonStyle={styles.closeButton}
                                onPress={() => setOpen(0)}
                            ></Button>
                        </View>
                            <Card.Divider/>
                            <View>
                            {
                                options.map((option) => {
                                return (
                                    <View>
                                        <Button
                                            title={option}
                                        >
                                        </Button>
                                        <Card.Divider/>
                                    </View>
                                );
                                })
                            }
                            </View>
                        </Card>: null }
        </View>
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
    },
    cardContainer: {
        position: 'absolute',
        width: width*0.8,
        backgroundColor: 'white',
        zIndex: 200,
        marginTop: height*0.1,
        marginLeft: width*0.1,
    },
    card: {
        height: height*0.09,
    },
    closeButton: {padding:0, 
        backgroundColor: 'transparent', 
        width: width*0.08, 
        height: height*0.05, 
        marginBottom: width*0.05, 
        marginLeft: width*0.18
    }
})