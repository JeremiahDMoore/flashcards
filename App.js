// In App.js in a new project

import * as React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./src/screens/Home";
import Login from "./src/screens/Login";

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer independent={true} >
      <Stack.Navigator>
        <Stack.Screen name="Login" component={ Login } />
        <Stack.Screen name="Home" component={ Home } />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
