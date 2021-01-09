/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect } from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  View, Text
} from 'react-native';

import Login from "./components/Login"
import Registration from "./components/Register"
import Camera from "./components/Camera"
import Home from "./components/Home"
import ImagePreview from "./components/ImagePreview"


const App: () => React$Node = () => {
  const Stack = createStackNavigator();
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          {/*Add screens below*/}
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Registration} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Camera" component={Camera} />
          <Stack.Screen name="ImagePreview" component={ImagePreview} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};


export default App;
