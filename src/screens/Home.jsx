import { View, Text, Button, StyleSheet, Keyboard, TouchableWithoutFeedback } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './HomeScreen';
import DecksScreen from './DecksScreen';
import AddScreen from './AddScreen';

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../utils/firebase";

export default function Home({ navigation }) {
  const signOut = async () => {
    auth.signOut();
    navigation.reset({ index: 0, routes: [{ name: "Login" }] });
  };

  const Tab = createBottomTabNavigator();

  return (
    <NavigationContainer independent={true}>
      {/* <Login /> */}
    <Tab.Navigator
       screenOptions={{
       headerShown: false,
        tabBarStyle: {
          backgroundColor: '#1E5A7F' // Replace with your desired background color
    }
  }}>
    <Tab.Screen
    name="Home"
    component={HomeScreen}
    options={{
      tabBarLabel: 'Home',
      tabBarActiveTintColor: '#9DD0E6',
      tabBarInactiveTintColor: '#43A3CC',
      tabBarIcon: ({ color }) => (
        <Ionicons name="home-outline" size={32} color={color} />
      ),
    }}
  />
  <Tab.Screen
    name="Decks"
    component={DecksScreen}
    options={{
      tabBarLabel: 'Decks',
      tabBarActiveTintColor: '#9DD0E6',
      tabBarInactiveTintColor: '#43A3CC',
      tabBarIcon: ({ color }) => (
        <Ionicons name="albums-outline" size={32} color={color} />
      ),
    }}
  />
  <Tab.Screen
    name="Add"
    component={AddScreen}
    options={{
      tabBarLabel: 'Add',
      tabBarActiveTintColor: '#9DD0E6',
      tabBarInactiveTintColor: '#43A3CC',
      tabBarIcon: ({ color }) => (
        <Ionicons name="add-circle-outline" size={32} color={color} />
      ),
    }}
  />
    </Tab.Navigator>

<Button
  title="Log out"
  onPress={() => {
    signOut();
    console.log('LOGGED OUT')
  }}
/>


    </NavigationContainer>
  );
}



