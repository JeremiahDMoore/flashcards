import { View, Button, SafeAreaView, Platform } from 'react-native';
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
      <NavigationContainer independent={true}>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarStyle: {
              paddingBottom: Platform.OS === 'android' ? 10 : 0,
              height: Platform.OS === 'android' ? 80 : 'auto',
              backgroundColor: '#1E5A7F', // Replace with your desired background color
            },
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === 'Home') {
                iconName = focused ? 'home' : 'home-outline';
              } else if (route.name === 'Decks') {
                iconName = focused ? 'albums' : 'albums-outline';
              } else if (route.name === 'Add') {
                iconName = focused ? 'add-circle' : 'add-circle-outline';
              }

              return <Ionicons name={iconName} size={32} color={color} style={{ paddingTop: 20 }} />;
            },
          })}
          tabBarOptions={{
            tabBarLabelPosition: 'below-icon',
            activeTintColor: '#9DD0E6',
            inactiveTintColor: '#43A3CC',
            labelStyle: { fontSize: 12 },
            showIcon: true,
            showLabel: true,
          }}
        >
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Decks" component={DecksScreen} />
          <Tab.Screen name="Add" component={AddScreen} />
          <Tab.Screen
            name="QuizScreen"
            component={QuizScreen}
            options={{
              tabBarButton: () => null,
              tabBarButtonStyle: { display: 'none' },
              tabBarActiveTintColor: '#9DD0E6',
              tabBarInactiveTintColor: '#43A3CC',
            }}
          />
        </Tab.Navigator>
        <View style={{ backgroundColor: '#1E5A7F' }}>
          <Button
            title="Log out"
            color="#fff"
            onPress={() => {
              signOut();
              console.log('LOGGED OUT');
            }}
          />
        </View>
      </NavigationContainer>
    </SafeAreaView>
  );
}
