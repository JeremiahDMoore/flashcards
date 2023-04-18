import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./src/screens/Home";
import Login from "./src/screens/Login";

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
      </Stack.Navigator>
      </NavigationContainer>
      </>
  );
}

export default App;
