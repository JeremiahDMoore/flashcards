import * as React from "react";
import { View, Text, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./src/screens/Home";
import Login from "./src/screens/Login";
import QuizScreen from "./src/screens/QuizScreen";

const Stack = createNativeStackNavigator();

const MyTheme = {
 
  colors: { 
    background:'#1E5A7F'
  },
};

function App() {
  return (
      <>
   
      <NavigationContainer theme={MyTheme} >
      <Stack.Navigator screenOptions={{
       headerShown: false }}>
        <Stack.Screen name="Login" component={ Login } />
        <Stack.Screen name="Home" component={ Home } />
        <Stack.Screen name="QuizScreen" component={QuizScreen} />
      </Stack.Navigator>
    </NavigationContainer>

        </>
  );
}

export default App;
