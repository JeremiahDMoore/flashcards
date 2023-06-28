import { View, TouchableOpacity, Text, SafeAreaView } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './HomeScreen';
import DecksScreen from './DecksScreen';
import AddScreen from './AddScreen';
import QuizScreen from './QuizScreen';
import { auth } from "../utils/firebase";

export default function Home({ navigation }) {
  const signOut = async () => {
    auth.signOut();
    navigation.reset({ index: 0, routes: [{ name: "Login" }] });
  };

  const Tab = createBottomTabNavigator();

  return (
    <SafeAreaView style={{ flex: 1, paddingBottom: 16, paddingTop: 20 }}>
    <NavigationContainer independent={true} >

    <Tab.Navigator
       screenOptions={{
       headerShown: false,
         tabBarStyle: {
              paddingBottom: Platform.OS === 'android' ? 10 : 0,
              height: Platform.OS === 'android' ? 80 : 80,
              backgroundColor: '#1E5A7F', // Replace with your desired background color
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
        <Ionicons name="home-outline" size={32} color={color} paddingTop={20} />
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
        <Ionicons name="albums-outline" size={32} color={color} paddingTop={20}/>
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
        <Ionicons name="add-circle-outline" size={32} color={color} paddingTop={20}/>
      ),
    }}
  />
<Tab.Screen
        name="QuizScreen"
        component={QuizScreen}
        options={{
          tabBarButton: () => null,
          tabBarButtonStyle: { display: 'none' },
          tabBarActiveTintColor: '#9DD0E6',
      tabBarInactiveTintColor: '#43A3CC'
        }}
        />
    </Tab.Navigator>
    <View style={{ backgroundColor: '#1E5A7F', paddingVertical: 10 }}>
  <TouchableOpacity
    onPress={() => {
      signOut();
      console.log('LOGGED OUT')
    }}
    style={{
      backgroundColor: '#1E5A7F',
      alignItems: 'center',
      padding: 10
    }}>
    <Text style={{ color: '#fff' }}>Log out</Text>
  </TouchableOpacity>
</View>

  </NavigationContainer>

  </SafeAreaView>
  );
}


