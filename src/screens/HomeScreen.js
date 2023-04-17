import React from 'react';
import { Text, View, Button, Image } from 'react-native';
import { auth } from "../utils/firebase";
import { NavigationContainer } from '@react-navigation/native';
// import AppNavigator from '../components/AppNavigator';

function HomeScreen({ navigation }) {
// working on Log Out button to be shown on home screen, right now only bottom nav log out button is working
  const signOut = async () => {
    auth.signOut();
    navigation.reset({ index: 0, routes: [{ name: "Login" }] });
  };

    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Image source={ require('../../assets/leon.jpeg') } style={{ width: 225, height: 225, resizeMode: 'cover' }} />
        <NavigationContainer independent={true}>
        <View style={{ backgroundColor: '#1E5A7F'}}>
<Button
  title="Log out"
  color="#fff"
  onPress={() => {
    signOut();
    console.log('LOGGED OUT')
  }}
/>
</View>

</NavigationContainer>
      </View>
    );
  }

export default HomeScreen;