/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { AppRegistry, Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { FontAwesome } from '@expo/vector-icons';
import {
  StyleSheet, Text, View
} from 'react-native';
import { Button } from 'react-native-elements';
import Menu from './components/Menu.js';
import Properties from './components/Properties.js'
import ModelView from './components/ModelView.js'
//import {InDevScreen} from './components/InDevScreen'

AppRegistry.registerComponent('main', () => App);
AppRegistry.registerComponent('properties', () => Properties);
AppRegistry.registerComponent('modelview', () => ModelView);
AppRegistry.registerComponent('InDevScreen', () => InDevScreen);

const Stack = createStackNavigator();

var width = Dimensions.get('window').width;

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Menu" component={Menu} options={{ headerShown: false }}/>
        <Stack.Screen name="Properties" component={Properties} options={{ headerShown: false }}/>
        <Stack.Screen name="ModelView" component={ModelView} options={{ headerShown: false }}/>
        
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: width*0.02,
  },
});

export default App